import { Module } from '@nestjs/common';

import { UsersController } from '@usersModule/controllers/users.controller';
import { UsersService } from '@usersModule/services/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
