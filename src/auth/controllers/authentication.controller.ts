import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';

import {LocalAuthGuard} from '@authModule/guards/local-auth.guard';
import {AuthenticationDto} from '@authModule/dtos/authenticacion.dto';
import { AuthenticationService } from '@authModule/services/authentication.service';
import { User } from '@usersModule/entities/user.entity';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login( @Req() req:Request ,@Body() payload: AuthenticationDto) {
    const user = req.user as User;
    return await this.authService.generateJWT(user);
  }
}
