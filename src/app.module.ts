import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '@usersModule/users.module';
import { BrandsModule } from '@brandsModule/brands.module';
import { ProductsModule } from '@productsModule/products.module';
import { OrdersModule } from '@ordersModule/orders.module';
import { CategoriesModule } from '@categoriesModule/categories.module';
import { CustomersModule } from '@customersModule/customers.module';

@Module({
  imports: [UsersModule, BrandsModule, ProductsModule, OrdersModule, CategoriesModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
