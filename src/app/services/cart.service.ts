import { Injectable } from '@angular/core';
import {Product} from '../objects/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public products: Set<Product>;

  constructor() {
    this.products = new Set<Product>();
  }


}
