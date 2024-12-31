import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '@categoriesModule/entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '@categoriesModule/dtos/categories.dto';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoriesRepository: Repository<Category>
  ){}

  async create(playload: CreateCategoryDto) {

    const newCategory = this.categoriesRepository.create({
      ...playload,
      createAt: new Date(),
      updateAt: new Date()
    });

    return await this.categoriesRepository.save(newCategory);
  }

  async update(id: number, payload: UpdateCategoryDto) {
    const updatedCategory = await this.categoriesRepository.findOneBy({id});
    if(!updatedCategory) return null;
    this.categoriesRepository.merge(
      updatedCategory,
      {...payload, updateAt: new Date()});
    return await this.categoriesRepository.save(updatedCategory);
  }
  async delete(id: number) {
  const categoryToDelete = await this.findOne(id);
  if(!categoryToDelete) return null;
  return await this.categoriesRepository.remove(categoryToDelete);
  }
  async findOne(id: number) {
    return await this.categoriesRepository.findOneBy({id});
  }
  async findAll() {
    return await this.categoriesRepository.find();
  }
}
