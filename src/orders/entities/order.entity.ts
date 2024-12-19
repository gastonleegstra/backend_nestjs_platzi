import { Customer } from "@customersModule/entities/customer.entity";
import { Product } from "@productsModule/entities/product.entity";

export class Order {
  id: number;
  customer: Customer;
  status: string;
  products: Product[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
