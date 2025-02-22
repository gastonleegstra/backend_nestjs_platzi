import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';

import {LocalAuthGuard} from '@authModule/guards/local-auth.guard';
import { GoogleAuthGuard } from '@authModule/guards/google-auth.guard';
import {AuthenticationDto} from '@authModule/dtos/authenticacion.dto';
import { AuthenticationService } from '@authModule/services/authentication.service';
import { User } from '@usersModule/entities/user.entity';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

    /**
   * Inicia sesión con credenciales locales.
   * @param req - Objeto de solicitud.
   * @param payload - Datos de autenticación.
   * @returns Token JWT.
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login( @Req() req:Request ,@Body() payload: AuthenticationDto) {
    return await this.authService.generateJWT(req.user as User);
  }

  /**
   * Inicia el proceso de autenticación con Google.
   */
  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleAuth(){
    // Redirige al usuario a la página de inicio de sesión de Google.
  }

  /**
   * Maneja la devolución de llamada de Google después de la autenticación.
   * @param req - Objeto de solicitud.
   * @returns Token JWT.
   */
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleAuthCallback(@Req() req:Request) {
    return await this.authService.generateJWT(req.user as User);
  }

}
