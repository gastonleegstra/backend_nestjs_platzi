import { Module } from '@nestjs/common';

import { CustomersService } from '@customersModule/services/customers.service';
import { CustomersController } from '@customersModule/controllers/customers.controller';
import { UsersModule } from '@usersModule/users.module';

@Module({
  imports: [UsersModule],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService]
})
export class CustomersModule {}
