import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';
import {AuthenticationService} from '@authModule/services/authentication.service';

@Injectable()
export class LocalStrategy  extends PassportStrategy(Strategy, 'local') {
  constructor(private authenticationService: AuthenticationService) {
    super({usernameField: 'email'});
  }
  async validate(email: string, password: string) {
    const user = await this.authenticationService.validateUser(email, password);
    if (!user) throw new UnauthorizedException('NOT VALID CREDENTIALS');
    return user;
  }
}
