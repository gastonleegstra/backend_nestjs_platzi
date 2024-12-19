import { Module } from '@nestjs/common';

import { CustomersService } from '@customersModule/services/customers.service';
import { CustomersController } from '@customersModule/controllers/customers.controller';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
