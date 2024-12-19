import { AddressDto, CreateCustomerDto } from '@customersModule/dtos/customers.dtos';
import { Controller, Get, Param, Post, Body, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { CustomersService } from '@customersModule/services/customers.service';
import { Address } from '@customersModule/entities/customer.entity';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }
  @Get()
  getAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: string) {
    return this.customersService.findOne(+id);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    let address: Address = payload.address;
    return this.customersService.create({
      ...payload,
      address
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
