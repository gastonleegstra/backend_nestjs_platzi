import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import { User } from "@usersModule/entities/user.entity";

export class Address{
    street: string;
    city: string;
    state: string;
    zipCode: string;
}

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
  @Column({ type: "simple-json", nullable: true })
  address?: Address;
  @Column({ type: "timestamp" })
  createAt: Date;
  @Column({ type: "timestamp" })
  updateAt: Date;
}

