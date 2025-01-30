import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CustomersService } from '@customersModule/services/customers.service';
import { CreateCustomerDto } from '@customersModule/dtos/customers.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { Address } from '@customersModule/entities/customer.entity';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiOperation({ summary: 'Get all customers' })
  @Get()
  getAll(@Query() params: PaginationDto) {
    return this.customersService.findAll(params);
  }

  @ApiOperation({ summary: 'Get one customer' })
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: string) {
    return this.customersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Create a customer' })
  @Post()
  create(@Body() payload: CreateCustomerDto) {
    const address: Address = payload.address;
    return this.customersService.create({
      ...payload,
      address,
    });
  }

  @ApiOperation({ summary: 'Update a customer' })
  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return this.customersService.update(+id, payload);
  }

  @ApiOperation({ summary: 'Delete a customer' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.customersService.delete(+id);
  }
}
