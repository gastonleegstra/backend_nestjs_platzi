import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm';

import {Order} from "./order.entity";
import {Product} from "@productsModule/entities/product.entity";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'int'})
  quantity: number;

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

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @ManyToOne(()=>Product)
  product: Product

}
