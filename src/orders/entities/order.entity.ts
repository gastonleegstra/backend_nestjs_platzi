import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Customer } from '@customersModule/entities/customer.entity';
import { Product } from '@productsModule/entities/product.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => Customer)
  @JoinColumn()
  customer: Customer;
  @Column({ type: 'varchar', length: 255 })
  status: string;
  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
  @Column({ type: 'float' })
  total: number;
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
