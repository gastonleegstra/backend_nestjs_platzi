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
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import {
  CreateProductDto,
  UpdateProductDto,
  PaginationProductDto,
} from '@productsModule/dtos/products.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @ApiOperation({ summary: 'List all products' })
  @Get()
  getAll(@Query() params: PaginationProductDto) {
    return this.productService.findAll(params);
  }

  @ApiOperation({ summary: 'Get one product by id' })
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: string) {
    const productSearched = this.productService.findOne(+id);
    if (!productSearched) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return productSearched;
  }

  @ApiOperation({ summary: 'Create a new product' })
  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productService.create({
      ...payload,
    });
  }

  @ApiOperation({ summary: 'Update a product by id' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productService.update(+id, {
      ...payload,
    });
  }

  @ApiOperation({ summary: 'Delete a product by id' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: string) {
    const productDeleted = this.productService.delete(+id);
    if (!productDeleted) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return productDeleted;
  }
}
