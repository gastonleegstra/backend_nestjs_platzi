import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCustomerDto, UpdateCustomerDto } from '@customersModule/dtos/customers.dto';
import { Customer } from '@customersModule/entities/customer.entity';
import { UsersService } from '@usersModule/services/users.service';
import { User } from '@usersModule/entities/user.entity';

@Injectable()
export class CustomersService {

  constructor(
    @InjectRepository(Customer) private customersRepository: Repository<Customer>,
    private usersService: UsersService)
  {}

  async findAll(): Promise<Customer[]> {
    return await this.customersRepository.find();
  }
  async findOne(id: number): Promise<Customer | null> {
    return await this.customersRepository.findOneBy({id});
  }
  async create(payload: CreateCustomerDto): Promise<Customer|null> {
    let user: User = await this.usersService.findOne(payload.id);
    let newCustomer = new Customer();
    Object.assign(newCustomer, {
      user,
      ...payload,
      createAt: new Date(),
      updateAt: new Date()
    })
    this.customersRepository.save(newCustomer);
    return newCustomer;
  }
  async update(id: number, payload: UpdateCustomerDto): Promise<Customer | null> {
    const customerToUpdate = await this.customersRepository.findOneBy({id});
    if (!customerToUpdate) return null;
    let user: User = await this.usersService.findOne(payload.id);
    Object.assign(customerToUpdate,{
      ...customerToUpdate,
      user,
      ...payload,
      updateAt: new Date()
    })
    await this.customersRepository.save(customerToUpdate);
    return customerToUpdate;
  }
  async delete(id: number): Promise<Customer | null> {
    const customerToDelete = await this.customersRepository.findOneBy({id});
    if (!customerToDelete) return null;
    await this.customersRepository.remove(customerToDelete);
    return customerToDelete;
  }
}
