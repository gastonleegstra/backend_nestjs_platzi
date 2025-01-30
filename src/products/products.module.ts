import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsService } from '@productsModule/services/products.service';
import { ProductsController } from '@productsModule/controllers/products.controller';
import { Product } from '@productsModule/entities/product.entity';
import { BrandsModule } from '@brandsModule/brands.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), BrandsModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}
