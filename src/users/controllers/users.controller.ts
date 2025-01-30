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
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { UsersService } from '@usersModule/services/users.service';
import { CreateUserDto, UpdateUserDto } from '@usersModule/dtos/users.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'List all users' })
  @Get()
  getAll(@Query() params: PaginationDto) {
    return this.usersService.findAll(params);
  }

  @ApiOperation({ summary: 'Get one user' })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Create a new user' })
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @ApiOperation({ summary: 'Update a user' })
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateUserDto) {
    return this.usersService.update(+id, payload);
  }

  @ApiOperation({ summary: 'Delete a user' })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usersService.delete(+id);
  }
}
