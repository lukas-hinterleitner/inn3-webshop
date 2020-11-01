import { Injectable } from '@angular/core';

import {Product} from '../objects/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly products: Map<string, Product>;

  constructor() {
    this.products = new Map<string, Product>();

    const newProduct = new Product('1', 'NFC Tags',
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
         labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
         aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
         eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.`,
        19.99, '../../../assets/images/sample-product.jpeg');

    this.products.set(newProduct.getId(), newProduct);
  }

  getAllProducts() {
    // TODO get products from server
    return Array.from(this.products.values());
  }

  getProductById(id: string) {
    return this.products.get(id);
  }
}
