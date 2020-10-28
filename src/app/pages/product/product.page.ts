import {Component, OnInit, Optional} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../objects/product';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {LoadingService} from '../../services/loading.service';
import {CartService} from '../../services/cart.service';
import {CartProduct} from '../../objects/cart-product';

@Component({
    selector: 'app-product',
    templateUrl: './product.page.html',
    styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
    public product: Product = new Product('-1', '', '', 0, '');
    public productLoaded: boolean;
    public quantity: number;

    constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private router: Router,
                private loadingService: LoadingService, private cartService: CartService) {
        this.quantity = 1;
    }

    async ngOnInit() {
        await this.loadingService.showLoading(false);

        if (this.activatedRoute.snapshot.paramMap.has('id')) {
            const productId = this.activatedRoute.snapshot.paramMap.get('id');

            const product = this.productService.getProductById(productId);

            if (product !== undefined) {
                this.product = product;
                this.productLoaded = true;
            }
        } else {
            await this.router.navigate(['/products']);
        }

        await this.loadingService.closeLoading();
    }

    async addToCart() {
        this.cartService.addToCart(new CartProduct(this.product, this.quantity));
    }
}
