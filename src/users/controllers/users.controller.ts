import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

import { UsersService } from '@usersModule/services/users.service';
import { CreateUserDto, UpdateUserDto } from '@usersModule/dtos/users.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getAll(@Query() params: PaginationDto) {
    return this.usersService.findAll(params);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
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
