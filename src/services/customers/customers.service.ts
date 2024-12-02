import { Customer } from '@entities/customer.entity';
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
  }];

  findAll() {
    return this.customers;
  }
  findOne(id: number) {
    return this.customers.find(customer => customer.id === id);
  }
  create(payload: any) {
    let id = this.customers.length + 1;
    let newCustomer: Customer = {
      id,
      ...payload
    }
    this.customers.push(newCustomer);
    return newCustomer;
  }
}
