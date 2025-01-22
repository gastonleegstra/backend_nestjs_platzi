import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Customer } from '@customersModule/entities/customer.entity';
import {OrderItem} from './order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @OneToMany(()=> OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[]

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date;
}
