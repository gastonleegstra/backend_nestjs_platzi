export class Customer {
  id: number;
  name: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  }
  createAt: Date;
  updateAt: Date;
}
