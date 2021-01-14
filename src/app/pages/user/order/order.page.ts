import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderService, PlacedOrder} from '../../../services/order.service';
import {UnsubscribeOnDestroyAdapter} from '../../../utilities/unsubscribe-on-destroy-adapter';
import {DarkModeService} from '../../../services/dark-mode.service';
import {LoadingService} from '../../../services/loading.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.page.html',
    styleUrls: ['./order.page.scss'],
})
export class OrderPage extends UnsubscribeOnDestroyAdapter implements OnInit {
    public order: PlacedOrder = {} as PlacedOrder;

    public totalPrice = 0;
    public headerColor: string;

    constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService, private darkModeService: DarkModeService,
                private loadingService: LoadingService) {
        super();

        this.subscriptions.add(this.darkModeService.getHeaderColor().subscribe(headerColor => {
            this.headerColor = headerColor;
        }));
    }

    async ngOnInit() {
        await this.loadingService.showLoading();

        const orderNumber = this.activatedRoute.snapshot.paramMap.get('order-number');

        this.order = await this.orderService.getOrder(orderNumber);

        this.order.orderProducts.forEach(product => {
            this.totalPrice = this.totalPrice + (product.amount * product.price);
        });

        await this.loadingService.closeLoading();
    }

}
