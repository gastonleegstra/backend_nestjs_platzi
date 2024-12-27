import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomersService } from '@customersModule/services/customers.service';
import { CustomersController } from '@customersModule/controllers/customers.controller';
import { Customer } from '@customersModule/entities/customer.entity';
import { UsersModule } from '@usersModule/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), UsersModule],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService]
})
export class CustomersModule {}
