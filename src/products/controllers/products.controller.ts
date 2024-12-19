import { Controller, Query, Get, Param, Post, Body, Put, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ProductsService } from '@productsModule/services/products.service';
import { CreateProductDto, UpdateProductDto, ProductDto } from '@productsModule/dtos/products.dtos';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) { }
  @Get()
  getAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    // return {
    //     message: `Products limit=${limit} offset=${offset} brand=${brand}`,
    // };
    return this.productService.findAll();
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
  create(@Body() payload: ProductDto) {
    return this.productService.create({
      ...payload,
      createAt: new Date(),
      updateAt: new Date()
    });
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() payload: ProductDto) {
    return this.productService.update(+id, {
      ...payload,
      updateAt: new Date()
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
