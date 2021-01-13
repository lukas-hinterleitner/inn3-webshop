import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {LoadingService} from '../../services/loading.service';
import {CartProduct} from '../../objects/cart-product';
import {AlertController} from '@ionic/angular';
import {UserManagementService} from '../../services/user-management.service';
import {ToastService} from '../../services/toast.service';
import {Router} from '@angular/router';
import {DarkModeService} from '../../services/dark-mode.service';
import {UnsubscribeOnDestroyAdapter} from '../../utilities/unsubscribe-on-destroy-adapter';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
export class CartPage extends UnsubscribeOnDestroyAdapter implements OnInit {
    public products: CartProduct[];
    public totalPrice: number;

    public loggedIn: boolean;

    public amount = new Array(20); // only needed for view

    public headerColor: string;

    constructor(private cartService: CartService, private loadingService: LoadingService, private alertController: AlertController,
                private userManagementService: UserManagementService, private toastService: ToastService, private router: Router,
                private darkModeService: DarkModeService) {
        super();

        this.products = [];
        this.totalPrice = 0;

        this.subscriptions.add(this.darkModeService.getHeaderColor().subscribe(headerColor => {
            this.headerColor = headerColor;
        }));

        this.subscriptions.add(this.cartService.getProductsInCart().subscribe(products => {
            this.products = products;

            this.totalPrice = 0;
            this.products.forEach(product => {
                this.totalPrice = this.totalPrice + (product.getQuantity() * product.getProduct().getPrice());
            });
        }));

        this.subscriptions.add(this.userManagementService.isLoggedIn().subscribe(value => {
            this.loggedIn = value;
        }));
    }

    ngOnInit() {
    }

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
