import { Injectable } from '@nestjs/common';
import { CreateProductPayload, Product } from './products.interface';

@Injectable()
export class ProductsService {
    products: Product[] = []
    idCounter = 0
    getProducts() {
        return this.products
    }

    createProduct({ name, price, tags = [] }: CreateProductPayload) {
        const product = { id: this.idCounter, name, price, tags }
        this.products.push(product)
        this.idCounter++
        return product
    }
}
