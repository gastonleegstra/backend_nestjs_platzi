import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { ConfigType } from '@nestjs/config';
import config from 'config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {
    super({
      clientID: configService.googleClientId,
      clientSecret: configService.googleClientSecret,
      callbackURL: configService.googleCallbackUrl,
      authorizationURL: 'https://accounts.google.com/o/oauth2/auth', // Agregar la URL de autorización
      tokenURL: 'https://accounts.google.com/o/oauth2/token', // Agregar la URL de token
      scope:['email', 'profile']
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { name, emails, photos, id } = profile;
    const user = {
      googleId: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    return done(null, user);
  }
}
