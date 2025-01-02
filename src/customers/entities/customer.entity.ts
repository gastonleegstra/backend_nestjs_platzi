import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '@usersModule/entities/user.entity';

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
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
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
