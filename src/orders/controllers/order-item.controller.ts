import {
  Controller,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { OrderItemService } from '@ordersModule/services/order-item.service';
import {
  createOrderItemDto,
  updateOrderItemDto,
} from '@ordersModule/dtos/order-item.dto';

@ApiTags('order-item')
@Controller('order-item')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}

  @ApiOperation({ summary: 'Create a new order item' })
  @Post()
  create(@Body() payload: createOrderItemDto) {
    return this.orderItemService.create(payload);
  }

  @ApiOperation({ summary: 'Update an order item' })
  @Put(':idOrderItem')
  updateProductInOrder(
    @Param('idOrderItem', ParseIntPipe) idOrderItem: number,
    @Body() payload: updateOrderItemDto,
  ) {
    return this.orderItemService.update(idOrderItem, payload);
  }

  @ApiOperation({ summary: 'Delete an order item' })
  @Delete(':idOrderItem')
  removeProductFromOrder(
    @Param('idOrderItem', ParseIntPipe) idOrderItem: number,
  ) {
    return this.orderItemService.delete(idOrderItem);
  }
}
