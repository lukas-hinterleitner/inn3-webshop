import {Component, OnInit} from '@angular/core';

import {ProductService} from '../../services/product.service';
import {Product} from '../../objects/product';
import {LoadingService} from '../../services/loading.service';
import {DarkModeService} from '../../services/dark-mode.service';
import {UnsubscribeOnDestroyAdapter} from '../../utilities/unsubscribe-on-destroy-adapter';

@Component({
    selector: 'app-products',
    templateUrl: './products.page.html',
    styleUrls: ['./products.page.scss'],
})
export class ProductsPage extends UnsubscribeOnDestroyAdapter implements OnInit {
    public headerColor: string;

    public products: Product[];
    public filteredProducts: Product[];
    public arr = Array(10);
    public productsLoaded: boolean;

    constructor(private productService: ProductService, private loadingService: LoadingService, private darkModeService: DarkModeService) {
        super();

        this.productsLoaded = false;
        this.products = [];
        this.filteredProducts = [];

        this.subscriptions.add(this.darkModeService.getHeaderColor().subscribe(headerColor => {
            this.headerColor = headerColor;
        }));
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
        await this.loadingService.showLoading();

        this.products = await this.productService.getAllProducts();
        this.filteredProducts = this.products;
        this.productsLoaded = true;

        await this.loadingService.closeLoading();
    }

    async handleInput(event) {
        await this.loadingService.showLoading();

        const query = event.target.value.toLowerCase();
        requestAnimationFrame(() => {
            this.filteredProducts = this.products.filter(product => {
               return product.getTitle().toLowerCase().includes(query) || product.getDescription().toLowerCase().includes(query);
            });
        });

        await this.loadingService.closeLoading();
    }
}
