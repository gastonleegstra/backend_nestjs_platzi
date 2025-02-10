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
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CreateBrandDto, UpdateBrandDto } from '@brandsModule/dtos/brands.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { BrandsService } from '@brandsModule/services/brands.service';
import { JwtAuthGuard } from '@authModule/guards/jwt-auth.guard';
import { Public } from '@authModule/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}
  @Public()
  @ApiOperation({ summary: 'Get all brands' })
  @Get()
  getAll(@Query() params: PaginationDto) {
    return this.brandsService.findAll(params);
  }

  @Public()
  @ApiOperation({ summary: 'Get one brand' })
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: string) {
    return this.brandsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Create a brand' })
  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create({
      ...payload,
    });
  }

  @ApiOperation({ summary: 'Update a brand' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandsService.update(+id, {
      ...payload,
    });
  }

  @ApiOperation({ summary: 'Delete a brand' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: string) {
    return this.brandsService.delete(+id);
  }
}
