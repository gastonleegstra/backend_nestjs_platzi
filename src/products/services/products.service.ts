import { CreateProductDto, UpdateProductDto } from '@productsModule/dtos/products.dto';
import { Injectable } from '@nestjs/common';
import { Product } from '@productsModule/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>)
    {}
    async findAll() {
        return await this.productsRepository.find();
    }
    async findOne(id: number) {
        return await this.productsRepository.findOneBy({id});
    }
    async create(payload: CreateProductDto) {
      const newProduct = this.productsRepository.create({...payload, createAt: new Date(), updateAt: new Date()});
      return await this.productsRepository.save(newProduct);
    }
    async update(id: number, payload: UpdateProductDto)  {
        const productToUpdate = await this.findOne(id);
        if(!productToUpdate) return null;
        this.productsRepository.merge(productToUpdate, {...payload, updateAt: new Date()});
        return await this.productsRepository.save(productToUpdate);
    }
    async delete(id: number) {
        const productToDelete = await this.findOne(id);
        if(!productToDelete) return null;
        return await this.productsRepository.remove(productToDelete);
    }
}
