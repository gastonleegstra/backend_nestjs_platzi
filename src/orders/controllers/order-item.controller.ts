import {
  Controller,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { OrderItemService } from '@ordersModule/services/order-item.service';
import {
  createOrderItemDto,
  updateOrderItemDto,
} from '@ordersModule/dtos/order-item.dto';

@Controller('order-item')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}
  @Post()
  create(@Body() payload: createOrderItemDto) {
    return this.orderItemService.create(payload);
  }

  @Put(':idOrderItem')
  updateProductInOrder(
    @Param('idOrderItem', ParseIntPipe) idOrderItem: number,
    @Body() payload: updateOrderItemDto,
  ) {
    return this.orderItemService.update(idOrderItem, payload);
  }
  @Delete(':idOrderItem')
  removeProductFromOrder(
    @Param('idOrderItem', ParseIntPipe) idOrderItem: number,
  ) {
    return this.orderItemService.delete(idOrderItem);
  }
}
