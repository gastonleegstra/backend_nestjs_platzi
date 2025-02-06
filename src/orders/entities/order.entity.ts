import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import { Customer } from '@customersModule/entities/customer.entity';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @Exclude()
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];

  @Expose()
  get products() {
    if (!this.items) return [];
    return this.items
      .filter((item) => !!item)
      .map((item) => ({
        idItem: item.id,
        idProduct: item.product.id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
      }));
  }

  @Expose()
  get total() {
    if (!this.items) return 0;
    return this.items
      .filter((item) => !!item)
      .reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0);
  }

  @Exclude()
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
