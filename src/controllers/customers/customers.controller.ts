import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';

@Controller('customers')
export class CustomersController {
    @Get()
    getAll(){
        return 'Customers';
    }

    @Get(':id')
    getOne(@Param('id') id:string){
        return id;
    }

    @Post()
    create(@Body() payload: any) {
        return {
            message: 'Customer created',
            payload
        };
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() payload: any) {
        return {
            message: `Customer updated ${id}`,
            payload
        };
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return {
            message: `Customer deleted ${id}`,
        };
    }
}
