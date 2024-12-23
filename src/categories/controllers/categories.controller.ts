import { CreateCategoryDto, UpdateCategoryDto } from '@categoriesModule/dtos/categories.dto';
import { Controller, ParseIntPipe, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CategoriesService } from '@categoriesModule/services/categories.service';
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }
  @Get()
  getAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create({
      ...payload
    });
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() payload: UpdateCategoryDto) {
    return this.categoriesService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: string) {
    return this.categoriesService.delete(+id);
  }
}
