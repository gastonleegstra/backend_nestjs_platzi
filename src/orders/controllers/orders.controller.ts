import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { createOrderDto, updateOrderDto } from '@ordersModule/dtos/orders.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { OrdersService } from '@ordersModule/services/orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Get all orders' })
  @Get()
  getAll(@Query() params: PaginationDto) {
    return this.ordersService.findAll(params);
  }

  @ApiOperation({ summary: 'Get one order' })
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @ApiOperation({ summary: 'Create order' })
  @Post()
  create(@Body() payload: createOrderDto) {
    return this.ordersService.create(payload);
  }

  @ApiOperation({ summary: 'Update order' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: updateOrderDto,
  ) {
    return this.ordersService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete order' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.delete(id);
  }
}
