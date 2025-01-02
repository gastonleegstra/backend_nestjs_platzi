import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createOrderDto, updateOrderDto } from '@ordersModule/dtos/orders.dto';
import { Product } from '@productsModule/entities/product.entity';
import { Order } from '@ordersModule/entities/order.entity';
import { CustomersService } from '@customersModule/services/customers.service';
import { ProductsService } from '@productsModule/services/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    private customersService: CustomersService,
    private productsService: ProductsService,
  ) {}
  async create(payload: createOrderDto) {
    let products: Product[] = await Promise.all(
      payload.productsIds.map((id) => this.productsService.findOne(id)),
    );
    let customer = await this.customersService.findOne(payload.customerId);

    if (!customer || products.length === 0) return null;

    const newOrder = this.ordersRepository.create({
      customer,
      status: payload.status,
      products,
      total: products.reduce((total, product) => total + product.price, 0),
    });

    return await this.ordersRepository.save(newOrder);
  }
  async update(id: number, payload: updateOrderDto) {
    let orderToUpdate = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        customer: true,
        products: true,
      },
    });

    if (!orderToUpdate) return null;

    let updatedCustomer =
      payload.customerId && payload.customerId !== orderToUpdate.customer.id
        ? await this.customersService.findOne(payload.customerId)
        : orderToUpdate.customer;

    let updatedProducts = orderToUpdate.products;

    if (payload.productsIds && payload.productsIds.length > 0) {
      orderToUpdate = await this.ordersRepository.save({
        ...orderToUpdate,
        products: [],
      });
      updatedProducts = await Promise.all(
        payload.productsIds.map((id) => this.productsService.findOne(id)),
      );
    }

    const updatedTotal = updatedProducts.reduce(
      (total, product) => total + product.price,
      0,
    );

    this.ordersRepository.merge(orderToUpdate, {
      status: payload.status || orderToUpdate.status,
      customer: updatedCustomer,
      products: updatedProducts,
      total: updatedTotal,
    });

    await this.ordersRepository.save(orderToUpdate);

    return await this.ordersRepository.findOne({
      where: { id },
      relations: {
        customer: {
          user: true,
        },
        products: true,
      },
    });
  }
  async findAll() {
    return await this.ordersRepository.find({
      relations: {
        customer: {
          user: true,
        },
        products: true,
      },
    });
  }
  async findOne(id: number) {
    return await this.ordersRepository.findOne({
      where: { id },
      relations: {
        customer: {
          user: true,
        },
        products: true,
      },
    });
  }

  async delete(id: number) {
    let orderToDelete = await this.findOne(id);
    if (!orderToDelete) return null;
    return await this.ordersRepository.remove(orderToDelete);
  }
}
