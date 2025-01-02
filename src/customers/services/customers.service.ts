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

  async findAll() {
    return await this.customersRepository.find({
      relations: {
        user: true,
      }
    });
  }
  async findOne(id: number) {
    return await this.customersRepository.findOneBy({id});
  }
  async create(payload: CreateCustomerDto) {
    const user: User = await this.usersService.findOne(payload.id);
    if (!user) return null;
    const newCustomer = this.customersRepository.create( {
      user,
      ...payload,
    });
    return await this.customersRepository.save(newCustomer);
  }
  async update(id: number, payload: UpdateCustomerDto) {
    const customerToUpdate = await this.findOne(id);
    if (!customerToUpdate) return null;
    let user: User = await this.usersService.findOne(payload.id);
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
