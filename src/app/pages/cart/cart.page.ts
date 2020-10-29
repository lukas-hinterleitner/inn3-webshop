import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {LoadingService} from '../../services/loading.service';
import {CartProduct} from '../../objects/cart-product';
import {AlertController} from '@ionic/angular';
import {NgZone} from '@angular/core';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
    public products: CartProduct[];
    public amount = new Array(20);

    constructor(private cartService: CartService, private loadingService: LoadingService, private alertController: AlertController,
                private ngZone: NgZone) {
        this.products = [];

        this.cartService.getProductsInCart().subscribe(products => {
            this.ngZone.run(_ => {
                this.products = products;
            });
        });
    }

    ngOnInit() {}

    async clearCart() {
        const alert = await this.alertController.create({
            header: 'Clear Cart',
            message: 'Are you sure to clear your shopping cart?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                }, {
                    text: 'Clear',
                    handler: async () => {
                        await this.cartService.removeAllProductsFromCart();
                    }
                }
            ]
        });

        await alert.present();
    }

    async updateProducts() {
        await this.cartService.updateProductsInCart();
    }

    async removeFromCart(product: CartProduct) {
        const alert = await this.alertController.create({
            header: 'Remove Product',
            message: 'Remove ' + product.getProduct().getTitle() + ' from your cart?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                }, {
                    text: 'Remove',
                    handler: () => {
                        this.cartService.removeFromCart(product);
                    }
                }
            ]
        });

        await alert.present();
    }

}
