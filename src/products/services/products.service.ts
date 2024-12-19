import { CreateProductDto, UpdateProductDto } from '@productsModule/dtos/products.dtos';
import { Injectable } from '@nestjs/common';
import { Product } from '@productsModule/entities/product.entity';

@Injectable()
export class ProductsService {
    private products: Product[] = [
        {
            id: 1,
            title: 'Product 1',
            description: 'Description 1',
            price: 100,
            stock: 10,
            image: 'https://placeimg.com/640/480/any',
            createAt: new Date(),
            updateAt: new Date(),
        },
        {
            id: 2,
            title: 'Product 2',
            description: 'Description 2',
            price: 200,
            stock: 20,
            image: 'https://placeimg.com/640/480/any',
            createAt: new Date(),
            updateAt: new Date(),
        },
    ]
    findAll() {
        return this.products;
    }
    findOne(id: number) {
        return this.products.find(product => product.id === id);
    }
    create(payload: CreateProductDto) {
        let id = this.products.length + 1;

        let newProduct: Product = {
            id,
            title: payload.title,
            description: payload.description,
            price: payload.price,
            stock: payload.stock,
            image: payload.image,
            createAt: new Date(),
            updateAt: new Date(),
        };

        this.products.push(newProduct);
        return newProduct;
    }
    update(id: number, payload: UpdateProductDto) {
        const indexToUpdate = this.products.findIndex(product => product.id === id);
        if(indexToUpdate !== -1) {
            this.products[indexToUpdate] = {
                ...this.products[indexToUpdate],
                ...payload
            }
            return this.products[indexToUpdate];
        }
        return null;
    }
    delete(id: number) {
        const indexToDelete = this.products.findIndex(product => product.id === id);
        if(indexToDelete === -1) {
            return null;
        }
        const productToDelete = this.products[indexToDelete];
        this.products.splice(indexToDelete, 1);
        return productToDelete;
    }
}
