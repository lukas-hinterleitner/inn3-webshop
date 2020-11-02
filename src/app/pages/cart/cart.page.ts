import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {LoadingService} from '../../services/loading.service';
import {CartProduct} from '../../objects/cart-product';
import {AlertController, ModalController} from '@ionic/angular';
import {AuthenticationService} from '../../services/authentication.service';
import {ToastService} from '../../services/toast.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
    public products: CartProduct[];
    public totalPrice: number;

    public loggedIn: boolean;

    public amount = new Array(20); // only needed for view

    constructor(private cartService: CartService, private loadingService: LoadingService, private alertController: AlertController,
                private authService: AuthenticationService, private toastService: ToastService, private router: Router) {
        this.products = [];
        this.totalPrice = 0;

        this.cartService.getProductsInCart().subscribe(products => {
            this.products = products;

            this.totalPrice = 0;
            this.products.forEach(product => {
                this.totalPrice = this.totalPrice + (product.getQuantity() * product.getProduct().getPrice());
            });
        });

        this.authService.isLoggedIn().subscribe(value => {
            this.loggedIn = value;
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

    async openCheckout() {
        if (this.loggedIn) {
            await this.router.navigate(['/checkout']);
        } else {
            await this.toastService.showToast(2000, '', 'Log in to proceed to checkout!', 'danger');
        }
    }

}
