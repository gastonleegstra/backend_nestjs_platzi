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
    private productsService: ProductsService)
    {}
  async create(payload: createOrderDto): Promise<Order | null> {
    let products: Product[] = await Promise.all(payload.productsIds.map(id => this.productsService.findOne(id)));
    let customer = await this.customersService.findOne(payload.customerId);
    let newOrder: Order = new Order();
    Object.assign(newOrder, {
      customer,
      status: payload.status,
      products,
      total: products.reduce((total, product) => total + product.price, 0),
      createdAt: new Date(),
      updatedAt: new Date()
    })
    this.ordersRepository.save(newOrder);
    return newOrder;
  }
  async update(id: number, payload: updateOrderDto): Promise<Order | null> {
    const orderToUpdate = await this.ordersRepository.findOneBy({id});
    if(orderToUpdate) {
        Object.assign(orderToUpdate, payload);
        await this.ordersRepository.save(orderToUpdate);
        return orderToUpdate;
    }
    return null;
  }
  async findAll(): Promise<Order[]> {
    return await this.ordersRepository.find();
  }
  async findOne(id: number): Promise<Order | null> {
    return await this.ordersRepository.findOneBy({id}) ?? null;
  }

  async delete (id: number) {
    let orderToDelete = await this.ordersRepository.findOneBy({id});
    if (!orderToDelete) return null;
    await this.ordersRepository.remove(orderToDelete);
    return orderToDelete;
  }

}
