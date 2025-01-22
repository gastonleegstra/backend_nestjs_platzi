import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createOrderDto, updateOrderDto } from '@ordersModule/dtos/orders.dto';
import { Order } from '@ordersModule/entities/order.entity';
import { CustomersService } from '@customersModule/services/customers.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    private customersService: CustomersService,
  ) {}
  async create(payload: createOrderDto) {

    let customer = await this.customersService.findOne(payload.customerId);

    if (!customer) return null;

    const newOrder = this.ordersRepository.create({
      customer,
    });

    return await this.ordersRepository.save(newOrder);
  }
  async update(id: number, payload: updateOrderDto) {

    let orderToUpdate = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        customer: true
      },
    });

    if (!orderToUpdate) return null;

    let updatedCustomer =
      payload.customerId && payload.customerId !== orderToUpdate.customer.id
        ? await this.customersService.findOne(payload.customerId)
        : orderToUpdate.customer;

    this.ordersRepository.merge(orderToUpdate, {
      customer: updatedCustomer,
    });

    await this.ordersRepository.save(orderToUpdate);

    return await this.ordersRepository.findOne({
      where: { id },
      relations: {
        customer: {
          user: true,
        }
      },
    });
  }
  async findAll() {
    return await this.ordersRepository.find({
      relations: {
        customer: {
          user: true,
        },
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
        items: {
          product: true
        }
      },
    });
  }

  async delete(id: number) {
    let orderToDelete = await this.findOne(id);
    if (!orderToDelete) return null;
    return await this.ordersRepository.remove(orderToDelete);
  }
}
