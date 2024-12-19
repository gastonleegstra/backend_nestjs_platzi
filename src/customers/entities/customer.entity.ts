export class Customer {
  id: number;
  name: string;
  phone: string;
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
