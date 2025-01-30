import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@usersModule/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '@usersModule/dtos/users.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  async findAll(params?: PaginationDto) {
    if (!params) return await this.usersRepository.find();
    const { limit, offset } = params;
    return await this.usersRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({
      where: { id },
      relations: {
        customer: true,
      },
    });
  }

  async create(payload: CreateUserDto) {
    const newUser = this.usersRepository.create(payload);
    return await this.usersRepository.save(newUser);
  }

  async update(id: number, payload: UpdateUserDto) {
    const userToUpdate = await this.findOne(id);
    if (!userToUpdate) return null;
    this.usersRepository.merge(userToUpdate, payload);
    return await this.usersRepository.save(userToUpdate);
  }

  async delete(id: number) {
    const userToDelete = await this.findOne(id);
    if (!userToDelete) return null;
    return await this.usersRepository.remove(userToDelete);
  }
}
