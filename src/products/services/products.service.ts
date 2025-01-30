import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { In, FindOptionsWhere, Between } from 'typeorm';

import { Product } from '@productsModule/entities/product.entity';
import { Brand } from '@brandsModule/entities/brand.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  PaginationProductDto,
} from '@productsModule/dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Brand)
    private brandsRepository: Repository<Brand>,
  ) {}
  async findAll(params?: PaginationProductDto) {
    const where: FindOptionsWhere<Product> = {};
    if (!params) return await this.productsRepository.find();
    const { limit, offset, minPrice, maxPrice } = params;
    if (minPrice && maxPrice) where.price = Between(minPrice, maxPrice);
    return await this.productsRepository.find({
      where,
      take: limit,
      skip: offset,
    });
  }
  async findOne(id: number) {
    return await this.productsRepository.findOne({
      where: { id },
      relations: { brand: true },
    });
  }
  async findByids(ids: number[]) {
    return await this.productsRepository.find({
      where: { id: In(ids) },
    });
  }

  async create(payload: CreateProductDto) {
    const { brandId } = payload;
    let brand: Brand = null;
    if (brandId) {
      brand = await this.brandsRepository.findOneBy({ id: brandId });
    }
    const newProduct = this.productsRepository.create({
      ...payload,
      brand,
    });
    return await this.productsRepository.save(newProduct);
  }
  async update(id: number, payload: UpdateProductDto) {
    const productToUpdate = await this.findOne(id);
    if (!productToUpdate) return null;
    const { brandId } = payload;
    let brand: Brand = null;
    if (brandId) {
      brand = await this.brandsRepository.findOneBy({ id: brandId });
    }
    this.productsRepository.merge(productToUpdate, {
      brand,
      ...payload,
    });
    return await this.productsRepository.save(productToUpdate);
  }
  async delete(id: number) {
    const productToDelete = await this.findOne(id);
    if (!productToDelete) return null;
    return await this.productsRepository.remove(productToDelete);
  }
}
