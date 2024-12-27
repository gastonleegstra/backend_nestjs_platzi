import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({type: 'varchar', length: 255})
  title: string;
  @Column({type: 'text'})
  description: string;
  @Column({type: 'float'})
  price: number;
  @Column({type: 'int'})
  stock: number;
  @Column({type: 'varchar', nullable: true})
  image: string;
  @Column({type: 'timestamp'})
  createAt: Date;
  @Column({type: 'timestamp'})
  updateAt: Date;
}
