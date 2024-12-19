import { Module } from '@nestjs/common';

import { CategoriesService } from '@categoriesModule/services/categories.service';
import { CategoriesController } from '@categoriesModule/controllers/categories.controller';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
