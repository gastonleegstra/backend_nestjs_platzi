import { Module } from '@nestjs/common';

import { ProductsService } from '@productsModule/services/products.service';
import { ProductsController } from '@productsModule/controllers/products.controller';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
