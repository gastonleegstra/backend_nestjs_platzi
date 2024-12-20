import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
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
    getOne(@Param('id') id:string){
        return this.ordersService.findOne(+id);
    }

    @Post()
    create(@Body() payload: createOrderDto) {
        return this.ordersService.create(payload);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() payload: updateOrderDto) {
        return this.ordersService.update(+id, payload);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.ordersService.delete(+id);
    }
}
