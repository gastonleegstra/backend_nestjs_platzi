import { Controller,Get, Param, Post, Body, Put, Delete } from '@nestjs/common';

import { UsersService } from '@usersModule/services/users.service';
import { CreateUserDto, UpdateUserDto } from '@usersModule/dtos/users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
    @Get()
    getAll(){
        return this.usersService.findAll();
    }

    @Get(':id')
    getOne(@Param('id') id:number){
        return this.usersService.findOne(+id);
    }

    @Post()
    create(@Body() payload: CreateUserDto) {
        return this.usersService.create(payload);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() payload: UpdateUserDto) {
        return this.usersService.update(+id, payload);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.usersService.delete(+id);
    }
}
