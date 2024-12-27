import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from '@ordersModule/entities/order.entity';
import { OrdersService } from '@ordersModule/services/orders.service';
import { OrdersController } from '@ordersModule/controllers/orders.controller';
import { ProductsModule } from '@productsModule/products.module';
import { CustomersModule } from '@customersModule/customers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), ProductsModule, CustomersModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
