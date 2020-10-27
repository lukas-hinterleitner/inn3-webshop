import { Injectable } from '@angular/core';

import {Product} from '../objects/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Map<string, Product>;

  constructor() {
    this.products = new Map<string, Product>();
  }

  getAllProducts() {
    // TODO get products from server

    const newProduct = new Product(1, 'NFC Tags', 'Die besten NFC Tags zum besten Preis',
                                 19.99, '../../../assets/images/sample-product.jpeg');

    this.products = this.products.set(newProduct.getId(), newProduct);

    // TODO get products from server

    return this.products;
  }

  getProductById(id: string) {
    return this.products.get(id);
  }
}
