import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import { User } from '@usersModule/entities/user.entity';
import { Order } from '@ordersModule/entities/order.entity';

export class Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @Expose()
  get email(): string {
    if(!this.user) return '';
    return `${this.user.email}`;
  }

  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 255, default: null })
  phone: string;

  @OneToMany(() => Order, (order) => order.customer, { nullable: true })
  orders: Order[];
  @Column({ type: 'simple-json', nullable: true })
  address?: Address;

  @Exclude()
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
