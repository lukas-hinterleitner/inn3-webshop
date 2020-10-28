import {Component, OnInit} from '@angular/core';

import {ProductService} from '../../services/product.service';
import {Product} from '../../objects/product';
import {LoadingService} from '../../services/loading.service';

import {Router} from '@angular/router';

@Component({
    selector: 'app-products',
    templateUrl: './products.page.html',
    styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
    public products: Set<Product>;
    public arr = Array(10);
    public productsLoaded: boolean;

    constructor(private productService: ProductService, private loadingService: LoadingService, private router: Router) {
        this.products = new Set<Product>();
    }

    async getBase64ImageFromUrl(imageUrl) {
        const res = await fetch(imageUrl);
        const blob = await res.blob();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                resolve(reader.result);
            }, false);

            reader.onerror = () => {
                return reject(this);
            };
            reader.readAsDataURL(blob);
        });
    }

    async ngOnInit() {
        await this.loadingService.showLoading(false);

        await this.productService.getAllProducts().forEach(product => {
            this.products.add(product);
        });

        this.productsLoaded = true;

        await this.loadingService.closeLoading();
    }
}
