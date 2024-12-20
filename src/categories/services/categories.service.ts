import { Injectable } from '@nestjs/common';
import { Category } from '@categoriesModule/entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '@categoriesModule/dtos/categories.dto';
@Injectable()
export class CategoriesService {
  private categories: Category[] = [
    {
      id: 1,
      name: 'Category 1',
      description: 'Category 1 description',
      createAt: new Date(),
      updateAt: new Date(),
    },
  ];

  create(playload: CreateCategoryDto) {
    let id = this.categories.length + 1;
    let newCategory: Category = {
      id,
      ...playload,
      createAt: new Date(),
      updateAt: new Date()
    }

    this.categories.push(newCategory);
    return newCategory;
  }

  update(id: number, payload: UpdateCategoryDto) {
    const indexToUpdate = this.categories.findIndex(category => category.id === id);
    if(indexToUpdate !== -1) {
      this.categories[indexToUpdate] = {
        ...this.categories[indexToUpdate],
        ...payload,
        updateAt: new Date()
      }
      return this.categories[indexToUpdate];
    }
    return null;
  }
  delete(id: number) {
    const indexToDelete = this.categories.findIndex(category => category.id === id);
    if(indexToDelete === -1) {
      return null;
    }
    const categoryToDelete = this.categories[indexToDelete];
    this.categories.splice(indexToDelete, 1);
    return categoryToDelete;
  }
  findOne(id: number) {
    return this.categories.find(category => category.id === id);
  }
  findAll() {
    return this.categories;
  }
}
