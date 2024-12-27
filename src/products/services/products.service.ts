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
    async findAll(): Promise<Product[]> {
        return await this.productsRepository.find();
    }
    async findOne(id: number): Promise<Product | null> {
        return await this.productsRepository.findOneBy({id});
    }
    async create(payload: CreateProductDto) {
      const newProduct = new Product();
      Object.assign(newProduct, payload);
      await this.productsRepository.save(newProduct);
      return newProduct;
    }
    async update(id: number, payload: UpdateProductDto): Promise<Product | null> {
        const productToUpdate = await this.productsRepository.findOneBy({id});
        if(productToUpdate) {
            Object.assign(productToUpdate, payload);
            await this.productsRepository.save(productToUpdate);
            return productToUpdate;
        }
        return null;
    }
    async delete(id: number): Promise<Product | null> {
        const productToDelete = await this.productsRepository.findOneBy({id});
        if(!productToDelete) return null;
        await this.productsRepository.remove(productToDelete);
        return productToDelete;
    }
}
