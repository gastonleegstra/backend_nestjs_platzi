import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from '@ordersModule/entities/order-item.entity';
import { Product } from '@productsModule/entities/product.entity';
import { Order } from '@ordersModule/entities/order.entity';
import { createOrderItemDto, updateOrderItemDto } from '@ordersModule/dtos/order-item.dto';

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
  async create (payload: createOrderItemDto) {
    const order = await this.ordersRepository.findOne({where: {id: payload.idOrder}});
    const product = await this.productsRepository.findOne({where: {id: payload.idProducto}});

    const orderItem = this.orderItemRepository.create({
      quantity: payload.quantity,
      product,
      order
    });
    return this.orderItemRepository.save(orderItem);
  }

  async delete(orderId: number, productId: number) {
    const item = await this.orderItemRepository.findOne({
      where: {
        order: {
          id: orderId
        },
        product: {
          id: productId
        }
      }
    });
    return await this.orderItemRepository.remove(item);
  }

}
