import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {CartProduct} from '../../objects/cart-product';
import {ToastService} from '../../services/toast.service';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {LoadingService} from '../../services/loading.service';
import {UserManagementService} from '../../services/user-management.service';
import {UserData} from '../../objects/user-data';
import {DarkModeService} from '../../services/dark-mode.service';
import {UnsubscribeOnDestroyAdapter} from '../../utilities/unsubscribe-on-destroy-adapter';
import {HttpClient} from '@angular/common/http';
import {UserOrders} from '../../objects/user-orders';
import {Order} from '../../objects/order';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.page.html',
    styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage extends UnsubscribeOnDestroyAdapter implements OnInit {
    public user: UserData;

    public products: CartProduct[];
    public totalPrice: number;

    public agreement: boolean;

    public headerColor: string;

    constructor(private cartService: CartService, private alertController: AlertController, private toastService: ToastService,
                private router: Router, private loadingService: LoadingService, private userManagementService: UserManagementService,
                private darkModeService: DarkModeService, private httpClient: HttpClient) {
        super();

        this.products = [];

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

        this.subscriptions.add(this.userManagementService.getUser().subscribe(user => {
            this.user = user;
        }));
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

                        const order = {} as UserOrders;
                        order.userId = Number(this.user.id);
                        order.orders = this.products.map(value => {
                            return {
                                productId: Number(value.getProduct().getId()),
                                amount: value.getQuantity()
                            } as Order;
                        });

                        const response = await this.httpClient.post<OrderResponse>('https://inn3-webshop.lukas-hinterleitner.at/api/orders/',
                            order, {}).toPromise();

                        const success = response.success;

                        if (response.success === 1) {
                            await this.cartService.removeAllProductsFromCart();
                            await this.router.navigate(['user/orders', response.orderNumber]);
                        }

                        await this.loadingService.closeLoading();
                        await this.toastService.showToast(2500, '', success ? 'Your inquiry was sent to us!' +
                            ' Thank you for shopping with us.' : response.message, success ? 'success' : 'danger');
                    }
                }
            ]
        });

        await alert.present();
    }
}


export interface OrderResponse {
    success: number;
    status: number;
    message: string;
    orderNumber: string;
}
