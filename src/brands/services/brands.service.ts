import { CreateBrandDto, UpdateBrandDto } from '@brandsModule/dtos/brands.dto';
import { Brand } from 'src/brands/entities/brand.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    {
      id: 1,
      name: 'brand 1',
      description: 'brand 1 description',
      createAt: new Date(),
      updateAt: new Date()
    }
  ];
  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    return this.brands.find(brand => brand.id === id);
  }

  create(payload: CreateBrandDto) {
    let id = this.brands.length + 1;

    let newBrand: Brand = {
      id,
      ...payload,
      createAt: new Date(),
      updateAt: new Date()
    }

    this.brands.push(newBrand);
    return newBrand;
  }

  update(id: number, payload: UpdateBrandDto) {
    const indexToUpdate = this.brands.findIndex(brand => brand.id === id);
    if(indexToUpdate !== -1) {
      this.brands[indexToUpdate] = {
        ...this.brands[indexToUpdate],
        ...payload,
        updateAt: new Date()
      }
      return this.brands[indexToUpdate];
    }
    return null;
  }

  delete(id: number) {
    const indexToDelete = this.brands.findIndex(brand => brand.id === id);
    if(indexToDelete === -1) {
      return null;
    }
    const brandToDelete = this.brands[indexToDelete];
    this.brands.splice(indexToDelete, 1);
    return brandToDelete;
  }
}
