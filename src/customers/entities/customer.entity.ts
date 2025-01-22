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
  @OneToOne(() => User,(user) => user.customer,{nullable: true})
  @JoinColumn()
  user: User;

  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 255 , default: null})
  phone: string;

  @OneToMany(() => User,(order) => order.customer,{nullable: true})
  orders: Order[];
  @Column({ type: 'simple-json', nullable: true })
  address?: Address;
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createAt: Date;
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
   })
  updateAt: Date;
}
