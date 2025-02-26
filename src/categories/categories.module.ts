import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesService } from '@categoriesModule/services/categories.service';
import { CategoriesController } from '@categoriesModule/controllers/categories.controller';
import { Category } from '@categoriesModule/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
