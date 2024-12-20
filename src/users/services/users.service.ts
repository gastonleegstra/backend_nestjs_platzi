import { Injectable } from '@nestjs/common';

import { User } from '@usersModule/entities/user.entity';
import { CreateUserDto,UpdateUserDto } from '@usersModule/dtos/users.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'H1K3G@example.com',
      createAt: new Date(),
      updateAt: new Date(),
    }];
  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find(user => user.id === id);
  }

  create(payload: any) {
    const newUser: User = {
      id: this.users.length + 1,
      ...payload,
      createAt: new Date(),
      updateAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: any) {
    const indexToUpdate = this.users.findIndex(user => user.id === id);
    if(indexToUpdate !== -1) {
      this.users[indexToUpdate] = {
        ...this.users[indexToUpdate],
        ...payload
      }
      return this.users[indexToUpdate];
    }
    return null;
  }

  delete(id: number) {
    const user = this.findOne(id);
    if (!user) {
      return null;
    }
    const index = this.users.findIndex(item => item.id === id);
    this.users.splice(index, 1);
    return user;
  }

}
