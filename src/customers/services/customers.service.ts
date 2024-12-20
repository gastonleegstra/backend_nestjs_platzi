import { CreateCustomerDto, UpdateCustomerDto } from '@customersModule/dtos/customers.dto';
import { Customer } from '@customersModule/entities/customer.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
    id: 1,
    name: 'Customer 1',
    phone: '1234567890',
    address: {
      street: 'Street 1',
      city: 'City 1',
      state: 'State 1',
      zipCode: '12345',
    },
    createAt: new Date(),
    updateAt: new Date(),
  },{
    id: 2,
    name: 'Customer 2',
    phone: '1234567890',
    createAt: new Date(),
    updateAt: new Date(),
  }];

  findAll() {
    return this.customers;
  }
  findOne(id: number) {
    return this.customers.find(customer => customer.id === id);
  }
  create(payload: CreateCustomerDto) {
    let id = this.customers.length + 1;
    let newCustomer: Customer = {
      id,
      ...payload,
      createAt: new Date(),
      updateAt: new Date()
    }
    this.customers.push(newCustomer);
    return newCustomer;
  }
  update(id: number, payload: UpdateCustomerDto) {
    const customer = this.findOne(id);
    if (!customer) {
      return null;
    }
    const index = this.customers.findIndex(item => item.id === id);
    this.customers[index] = {
      ...customer,
      ...payload,
      updateAt: new Date()
    }
    return this.customers[index];
  }
  delete(id: number) {
    const customer = this.findOne(id);
    if (!customer) {
      return null;
    }
    const index = this.customers.findIndex(item => item.id === id);
    this.customers.splice(index, 1);
    return customer;
  }
}
