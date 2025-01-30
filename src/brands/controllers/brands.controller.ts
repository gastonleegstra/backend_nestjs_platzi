import {
  Controller,
  Query,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateBrandDto, UpdateBrandDto } from '@brandsModule/dtos/brands.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { BrandsService } from '@brandsModule/services/brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}
  @Get()
  getAll(@Query() params: PaginationDto) {
    return this.brandsService.findAll(params);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: string) {
    return this.brandsService.findOne(+id);
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create({
      ...payload,
    });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandsService.update(+id, {
      ...payload,
    });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: string) {
    return this.brandsService.delete(+id);
  }
}
