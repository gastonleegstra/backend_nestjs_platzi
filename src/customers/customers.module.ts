import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomersService } from '@customersModule/services/customers.service';
import { CustomersController } from '@customersModule/controllers/customers.controller';
import { Customer } from '@customersModule/entities/customer.entity';
import { User } from '@usersModule/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, User])],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService]
})
export class CustomersModule {}
