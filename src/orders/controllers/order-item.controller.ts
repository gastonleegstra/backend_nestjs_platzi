import { Controller, Put, Param, Delete, ParseIntPipe, Post, Body } from '@nestjs/common';
import { OrderItemService } from '@ordersModule/services/order-item.service';
import { createOrderItemDto } from '@ordersModule/dtos/order-item.dto';


@Controller('order-item')
export class OrderItemController {
  constructor(
    private orderItemService: OrderItemService
  ){}
  @Post()
  create(@Body() payload: createOrderItemDto) {
    return this.orderItemService.create(payload);
  }

  @Delete(':orderId/:productId')
  removeProductFromOrder(orderId: number, productId: number) {
    return this.orderItemService.delete(orderId, productId);
  }
}
