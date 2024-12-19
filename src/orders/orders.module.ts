import { Module } from '@nestjs/common';
import { OrdersService } from '@ordersModule/services/orders.service';
import { OrdersController } from '@ordersModule/controllers/orders.controller';
import { ProductsService } from '@productsModule/services/products.service';
import { CustomersService } from '@customersModule/services/customers.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, ProductsService, CustomersService],
})
export class OrdersModule {}
