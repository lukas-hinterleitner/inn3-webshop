import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {LoadingService} from '../../services/loading.service';
import {CartProduct} from '../../objects/cart-product';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
    public products: CartProduct[];

    constructor(private cartService: CartService, private loadingService: LoadingService) {
        this.products = [];

        this.cartService.getProductsInCart().subscribe(products => {
            this.products = products;
        });
    }

    ngOnInit() {

    }

    removeFromCart(product: CartProduct) {
        this.cartService.removeFromCart(product);
    }

}
