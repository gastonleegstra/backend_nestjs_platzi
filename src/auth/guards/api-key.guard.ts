import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ConfigType } from '@nestjs/config';

import config from 'config';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,//Inyecta el reflector
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>, //Inyecta el servicio de configuracion
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler()); //Obtiene la clave isPublic de la ruta
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest<Request>();//Obtiene la peticion
    const apiKey = request.header('api-key');//Obtiene la cabecera api-key
    const isAuth = apiKey === this.configService.apiKey;//Compara la api-key de la peticion con la configurada
    if (!isAuth)
      throw new UnauthorizedException(
        'The api key is not valid 👀, please check it',
      );
    return isAuth;
  }
}
