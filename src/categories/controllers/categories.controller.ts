import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@categoriesModule/dtos/categories.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';
import {
  Controller,
  ParseIntPipe,
  Get,
  Param,
  Post,
  Query,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from '@categoriesModule/services/categories.service';
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get()
  getAll(@Query() params: PaginationDto) {
    return this.categoriesService.findAll(params);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create({
      ...payload,
    });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: string) {
    return this.categoriesService.delete(+id);
  }
}
