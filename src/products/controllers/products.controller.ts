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
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from '@productsModule/services/products.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@productsModule/dtos/products.dto';

import { PaginationDto } from 'src/dtos/pagination.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Get()
  getAll(@Query() params: PaginationDto) {
    return this.productService.findAll(params);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: string) {
    const productSearched = this.productService.findOne(+id);
    if (!productSearched) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return productSearched;
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productService.create({
      ...payload,
    });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productService.update(+id, {
      ...payload,
    });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: string) {
    const productDeleted = this.productService.delete(+id);
    if (!productDeleted) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return productDeleted;
  }
}
