import { User } from "@usersModule/entities/user.entity";
export class Customer {
  id: number;
  user: User;
  address?: Address;
  createAt: Date;
  updateAt: Date;
}

export class Address{
    street: string;
    city: string;
    state: string;
    zipCode: string;
}
