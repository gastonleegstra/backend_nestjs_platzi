import { Controller,Get, Param, Post, Body, Put, Delete } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    getAll(){
        return 'users';
    }

    @Get(':id')
    getOne(@Param('id') id:string){
        return id;
    }

    @Post()
    create(@Body() payload: any) {
        return {
            message: 'User created',
            payload
        };
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() payload: any) {
        return {
            message: `User updated ${id}`,
            payload
        };
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return {
            message: `User deleted ${id}`,
        };
    }
}
