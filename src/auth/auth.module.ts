import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from "@usersModule/users.module";
import { AuthenticationService } from '@authModule/services/authentication.service';
import { AuthenticationController } from '@authModule/controllers/authentication.controller';
import config from 'config';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.registerAsync({
    inject: [config.KEY],
    useFactory: (configService: ConfigType<typeof config>) => ({
      secret: configService.jwtSecret,
      signOptions: {
        expiresIn: '1h'
      }
    }),
  })],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
