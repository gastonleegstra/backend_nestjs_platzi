import { Injectable } from '@nestjs/common';
import { createOrderDto, updateOrderDto } from '@ordersModule/dtos/orders.dto';
import { Product } from '@productsModule/entities/product.entity';
import { Order } from '@ordersModule/entities/order.entity';
import { CustomersService } from '@customersModule/services/customers.service';
import { ProductsService } from '@productsModule/services/products.service';

@Injectable()
export class OrdersService {
  private orders: Order[] = [];
  constructor(private customersService: CustomersService, private productsService: ProductsService) { }
  create(payload: createOrderDto) {
    let products: Product[] = payload.productsIds.map(id => this.productsService.findOne(id));
    let customer = this.customersService.findOne(payload.customerId);
    let id = this.orders.length + 1;
    let newOrder: Order = {
      id,
      customer,
      status: payload.status,
      products,
      total: products.reduce((total, product) => total + product.price, 0),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    this.orders.push(newOrder);
    return newOrder;
  }
  update(id: number, payload: updateOrderDto) {
    let index = this.orders.findIndex(order => order.id === id);
    if (index === -1) return null;
    let customer = payload.customerId ?
     this.customersService.findOne(payload.customerId) :
     this.orders[index].customer;
    let products: Product[] = payload.productsIds && payload.productsIds.length > 0 ?
      payload.productsIds.map(id => this.productsService.findOne(id)) :
      this.orders[index].products;
    let orderToUpdate = this.orders[index];
    this.orders[index] = {
      ...orderToUpdate,
      customer,
      products,
      total: products.reduce((total, product) => total + product.price, 0),
      updatedAt: new Date()
    };
    return this.orders[index];
  }
  findAll() {
    return this.orders;
  }
  findOne(id: number) {
    return this.orders.find(order => order.id === id) || null;
  }

  delete (id: number) {
    let index = this.orders.findIndex(order => order.id === id);
    if (index === -1) return null;
    let orderDeleted = this.orders[index];
    this.orders.splice(index, 1);
    return orderDeleted;
  }

}
