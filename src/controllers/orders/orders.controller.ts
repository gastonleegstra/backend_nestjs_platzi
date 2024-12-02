import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
    @Get()
    getAll(){
        return 'Orders';
    }
    
    @Get(':id')
    getOne(@Param('id') id:string){
        return id;
    }

    @Post()
    create(@Body() payload: any) {
        return {
            message: 'Order created',
            payload
        };
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() payload: any) {
        return {
            message: `Order updated ${id}`,
            payload
        };
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return {
            message: `Order deleted ${id}`,
        };
    }
}
