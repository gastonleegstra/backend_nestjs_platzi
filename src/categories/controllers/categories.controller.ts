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
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@categoriesModule/dtos/categories.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { CategoriesService } from '@categoriesModule/services/categories.service';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Get all categories' })
  @Get()
  getAll(@Query() params: PaginationDto) {
    return this.categoriesService.findAll(params);
  }

  @ApiOperation({ summary: 'Get one category' })
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: string) {
    return this.categoriesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Create a new category' })
  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create({
      ...payload,
    });
  }

  @ApiOperation({ summary: 'Update a category' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, payload);
  }

  @ApiOperation({ summary: 'Delete a category' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: string) {
    return this.categoriesService.delete(+id);
  }
}
