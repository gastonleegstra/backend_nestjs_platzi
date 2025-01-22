import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCustomerDto, UpdateCustomerDto } from '@customersModule/dtos/customers.dto';
import { Customer } from '@customersModule/entities/customer.entity';
import { User } from '@usersModule/entities/user.entity';

@Injectable()
export class CustomersService {

  constructor(
    @InjectRepository(Customer) private customersRepository: Repository<Customer>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  )
  {}

  async findAll() {
    return await this.customersRepository.find();
  }
  async findOne(id: number) {
    return await this.customersRepository.findOne({where: {id: id}, relations: {user: true}});
  }
  async create(payload: CreateCustomerDto) {
    const user: User = await this.usersRepository.findOne({where: {id: payload.userId}});
    if (!user) return null;
    const newCustomer = new Customer();
    this.customersRepository.merge(newCustomer, {
      user,
      ...payload
    })
    return await this.customersRepository.save(newCustomer);
  }
  async update(id: number, payload: UpdateCustomerDto) {
    const customerToUpdate = await this.findOne(id);
    if (!customerToUpdate) return null;
    let user: User = await this.usersRepository.findOne({where: {id: payload.userId}});
    if (!user) return null;
    this.customersRepository.merge(customerToUpdate,{
      user,
      ...payload
    })
    return await this.customersRepository.save(customerToUpdate);
  }
  async delete(id: number){
    const customerToDelete = await this.findOne(id);
    if (!customerToDelete) return null;
    return await this.customersRepository.remove(customerToDelete);
  }
}
