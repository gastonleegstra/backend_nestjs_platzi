import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from '@ordersModule/entities/order-item.entity';
import { Product } from '@productsModule/entities/product.entity';
import { Order } from '@ordersModule/entities/order.entity';
import {
  createOrderItemDto,
  updateOrderItemDto,
} from '@ordersModule/dtos/order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}
  async create(payload: createOrderItemDto) {
    const order = await this.ordersRepository.findOne({
      where: { id: payload.idOrder },
    });
    if (!order) return null;
    const product = await this.productsRepository.findOne({
      where: { id: payload.idProducto },
    });
    if (!product) return null;
    const orderItem = this.orderItemRepository.create({
      quantity: payload.quantity,
      product,
      order,
    });
    return this.orderItemRepository.save(orderItem);
  }

  async update(idOrdenItem: number, payload: updateOrderItemDto) {
    const orderItem = await this.orderItemRepository.findOne({
      where: {
        id: idOrdenItem,
      },
    });
    if (!orderItem) return null;
    const product = await this.productsRepository.findOne({
      where: { id: payload.idProducto },
    });
    if (!product) return null;
    const order = await this.ordersRepository.findOne({
      where: { id: payload.idOrder },
    });
    if (!order) return null;
    this.orderItemRepository.merge(orderItem, {
      quantity: payload.quantity,
      product,
      order,
    });
    return await this.orderItemRepository.save(orderItem);
  }

  async delete(idOrdenItem: number) {
    const item = await this.orderItemRepository.findOne({
      where: {
        id: idOrdenItem,
      },
    });
    if (!item) return null;
    return await this.orderItemRepository.remove(item);
  }
}
