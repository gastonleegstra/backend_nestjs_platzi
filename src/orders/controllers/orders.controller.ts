import { Controller, Get, Param, Post, Body, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { createOrderDto, updateOrderDto } from '@ordersModule/dtos/orders.dto';
import { OrdersService } from '@ordersModule/services/orders.service';

@Controller('orders')
export class OrdersController {
    constructor( private ordersService: OrdersService) {}
    @Get()
    getAll(){
        return this.ordersService.findAll();
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id:number){
        return this.ordersService.findOne(id);
    }

    @Post()
    create(@Body() payload: createOrderDto) {
        return this.ordersService.create(payload);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() payload: updateOrderDto) {
        return this.ordersService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.ordersService.delete(id);
    }
}
