import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBrandDto, UpdateBrandDto } from '@brandsModule/dtos/brands.dto';
import { Brand } from '@brandsModule/entities/brand.entity';
import { PaginationDto } from 'src/dtos/pagination.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandsRepository: Repository<Brand>,
  ) {}
  async findAll(params?: PaginationDto) {
    if (!params) return await this.brandsRepository.find();
    const { limit, offset } = params;
    return await this.brandsRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    return await this.brandsRepository.findOneBy({ id });
  }

  async create(payload: CreateBrandDto) {
    const newBrand = this.brandsRepository.create(payload);

    return await this.brandsRepository.save(newBrand);
  }

  async update(id: number, payload: UpdateBrandDto) {
    const updatedBrand = await this.findOne(id);
    if (!updatedBrand) return null;
    this.brandsRepository.merge(updatedBrand, payload);
    return await this.brandsRepository.save(updatedBrand);
  }

  async delete(id: number) {
    const deleteBrand = await this.findOne(id);
    if (!deleteBrand) return null;
    return await this.brandsRepository.remove(deleteBrand);
  }
}
