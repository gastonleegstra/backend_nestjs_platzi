import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinTable, JoinColumn } from "typeorm";

import { Customer } from "@customersModule/entities/customer.entity";
import { Product } from "@productsModule/entities/product.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(()=> Customer)
  @JoinColumn()
  customer: Customer;
  @Column({type: 'varchar', length: 255})
  status: string;
  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
  @Column({type: 'float'})
  total: number;
  @Column({type: 'timestamp'})
  createdAt: Date;
  @Column({type: 'timestamp'})
  updatedAt: Date;
}
