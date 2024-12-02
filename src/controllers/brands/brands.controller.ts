import { CreateBrandDto, UpdateBrandDto } from '@dtos/brands.dtos';
import { Controller, Query, Get, Param, Post, Body, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { BrandsService } from '@services/brands/brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) { }
    @Get()
    getAll(
        @Query('limit') limit = 100,
        @Query('offset') offset = 0
    ) {
        return this.brandsService.findAll();
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: string) {
        return this.brandsService.findOne(+id);
    }

    @Post()
    create(@Body() payload: CreateBrandDto) {
        return this.brandsService.create(
          {
            ...payload,
            createAt: new Date(),
            updateAt: new Date()
          });
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: string, @Body() payload: UpdateBrandDto) {
        return this.brandsService.update(+id, {
          ...payload,
          updateAt: new Date()
        });
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: string) {
        return this.brandsService.delete(+id);
    }
}
