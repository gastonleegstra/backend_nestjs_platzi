import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '@usersModule/users.module';
import { BrandsModule } from '@brandsModule/brands.module';
import { ProductsModule } from '@productsModule/products.module';
import { OrdersModule } from '@ordersModule/orders.module';
import { CategoriesModule } from '@categoriesModule/categories.module';
import { CustomersModule } from '@customersModule/customers.module';

import { enviroments } from 'enviroments';
import config from 'config';
import { validate } from 'env.validation';
import { DataModule } from './data/data.module';

@Module({
  imports: [
    UsersModule,
    BrandsModule,
    ProductsModule,
    OrdersModule,
    CategoriesModule,
    CustomersModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] ?? 'dev.env',
      load: [config],
      isGlobal: true,
      validate,
    }),
    DataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
