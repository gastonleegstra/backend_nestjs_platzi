import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '@categoriesModule/entities/category.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@categoriesModule/dtos/categories.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(playload: CreateCategoryDto) {
    const newCategory = this.categoriesRepository.create(playload);

    return await this.categoriesRepository.save(newCategory);
  }

  async update(id: number, payload: UpdateCategoryDto) {
    const updatedCategory = await this.categoriesRepository.findOneBy({ id });
    if (!updatedCategory) return null;
    this.categoriesRepository.merge(updatedCategory, payload);
    return await this.categoriesRepository.save(updatedCategory);
  }
  async delete(id: number) {
    const categoryToDelete = await this.findOne(id);
    if (!categoryToDelete) return null;
    return await this.categoriesRepository.remove(categoryToDelete);
  }
  async findOne(id: number) {
    return await this.categoriesRepository.findOneBy({ id });
  }
  async findAll(params?: PaginationDto) {
    if (!params) return await this.categoriesRepository.find();
    const { limit, offset } = params;
    return await this.categoriesRepository.find({
      take: limit,
      skip: offset,
    });
  }
}
