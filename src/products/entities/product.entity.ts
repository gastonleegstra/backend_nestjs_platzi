import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

import { Brand } from '@brandsModule/entities/brand.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  title: string;
  @Column({ type: 'text' })
  description: string;
  @Column({ type: 'float' })
  price: number;
  @Column({ type: 'int' })
  stock: number;
  @Column({ type: 'varchar', nullable: true })
  image: string;
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;
}
