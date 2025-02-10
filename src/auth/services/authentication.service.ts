import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import {UsersService} from '@usersModule/services/users.service';
import { User } from '@usersModule/entities/user.entity';
import { PayloadToken } from '@authModule/models/token.model';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
    return user;
  }

  async generateJWT(user: User) {
    const payload: PayloadToken = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user
    };
  }
}
