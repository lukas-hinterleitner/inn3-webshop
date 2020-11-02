import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {CartProduct} from '../../objects/cart-product';
import {ToastService} from '../../services/toast.service';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {LoadingService} from '../../services/loading.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.page.html',
    styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
    public products: CartProduct[];
    public totalPrice: number;

    public agreement: boolean;

    constructor(private cartService: CartService, private alertController: AlertController, private toastService: ToastService,
                private router: Router, private loadingService: LoadingService) {
        this.products = [];
        this.totalPrice = 0;

        this.cartService.getProductsInCart().subscribe(products => {
            this.products = products;

            this.totalPrice = 0;
            this.products.forEach(product => {
                this.totalPrice = this.totalPrice + (product.getQuantity() * product.getProduct().getPrice());
            });
        });
    }

    ngOnInit() {
    }

    async sendInquiry() {
        const alert = await this.alertController.create({
            header: 'Send Inquiry',
            message: 'Are you sure you want to send the inquiry?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                }, {
                    text: 'Send',
                    handler: async () => {
                        await this.loadingService.showLoading();

                        await this.cartService.removeAllProductsFromCart();
                        await this.router.navigate(['/products']);

                        await this.loadingService.closeLoading();

                        await this.toastService.showToast(2500, '', 'Your inquiry was sent to us!' +
                            ' Thank you for shopping with us.', 'success');
                    }
                }
            ]
        });

        await alert.present();
    }


}
