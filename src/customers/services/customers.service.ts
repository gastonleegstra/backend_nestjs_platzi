import { Injectable } from '@nestjs/common';

import { CreateCustomerDto, UpdateCustomerDto } from '@customersModule/dtos/customers.dto';
import { Customer } from '@customersModule/entities/customer.entity';
import { UsersService } from '@usersModule/services/users.service';
import { User } from '@usersModule/entities/user.entity';

@Injectable()
export class CustomersService {

  constructor(private usersService: UsersService) { }

  private customers: Customer[] = [];

  findAll() {
    return this.customers;
  }
  findOne(id: number) {
    return this.customers.find(customer => customer.id === id);
  }
  create(payload: CreateCustomerDto) {
    let id = this.customers.length + 1;
    let user: User = this.usersService.findOne(payload.id);
    let newCustomer: Customer = {
      id,
      user,
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
    let user: User = this.usersService.findOne(payload.id);
    const index = this.customers.findIndex(item => item.id === id);
    this.customers[index] = {
      ...customer,
      user,
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
