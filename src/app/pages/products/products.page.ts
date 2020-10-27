import { Component, OnInit } from '@angular/core';

import {ProductService} from '../../services/product.service';
import {Product} from '../../objects/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  public products: Set<Product>;

  constructor(private productService: ProductService) {
    this.products = new Set<Product>();
  }

  ngOnInit() {
    this.productService.getAllProducts().forEach(product => {
      this.products.add(product);
    });
  }
}
