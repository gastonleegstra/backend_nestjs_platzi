import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from '@ordersModule/entities/order.entity';
import { OrdersService } from '@ordersModule/services/orders.service';
import { OrdersController } from '@ordersModule/controllers/orders.controller';
import { ProductsModule } from '@productsModule/products.module';
import { CustomersModule } from '@customersModule/customers.module';
import { OrderItemController } from './controllers/order-item.controller';
import { OrderItemService } from './services/order-item.service';
import { OrderItem } from './entities/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    ProductsModule,
    CustomersModule,
  ],
  controllers: [OrdersController, OrderItemController],
  providers: [OrdersService, OrderItemService],
})
export class OrdersModule {}
