import { Injectable, Inject,UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';
import { Strategy, ExtractJwt } from 'passport-jwt';
import config from 'config';

import { PayloadToken } from '@authModule/models/token.model';

@Injectable()
export class JwtStrategy  extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>,
  ){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:configService.jwtSecret
  });
  }
  async validate(payload: PayloadToken) {
    return payload;
  }
}
