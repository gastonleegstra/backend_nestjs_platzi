import { Module } from '@nestjs/common';
import { OrdersService } from '@ordersModule/services/orders.service';
import { OrdersController } from '@ordersModule/controllers/orders.controller';
import { ProductsModule } from '@productsModule/products.module';
import { CustomersModule } from '@customersModule/customers.module';

@Module({
  imports: [ProductsModule, CustomersModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
