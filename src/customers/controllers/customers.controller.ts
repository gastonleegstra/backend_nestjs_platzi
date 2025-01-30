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

import { CustomersService } from '@customersModule/services/customers.service';
import { CreateCustomerDto } from '@customersModule/dtos/customers.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { Address } from '@customersModule/entities/customer.entity';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}
  @Get()
  getAll(@Query() params: PaginationDto) {
    return this.customersService.findAll(params);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: string) {
    return this.customersService.findOne(+id);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    const address: Address = payload.address;
    return this.customersService.create({
      ...payload,
      address,
    });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return this.customersService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.customersService.delete(+id);
  }
}
