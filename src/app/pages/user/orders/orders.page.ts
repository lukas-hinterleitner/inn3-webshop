import {Component, OnInit} from '@angular/core';
import {UnsubscribeOnDestroyAdapter} from '../../../utilities/unsubscribe-on-destroy-adapter';
import {DarkModeService} from '../../../services/dark-mode.service';
import {UserManagementService} from '../../../services/user-management.service';
import {OrderService, PlacedOrder} from '../../../services/order.service';
import {LoadingService} from '../../../services/loading.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.page.html',
    styleUrls: ['./orders.page.scss'],
})
export class OrdersPage extends UnsubscribeOnDestroyAdapter implements OnInit {
    public orders: PlacedOrder[] = [];

    public headerColor: string;

    constructor(private darkModeService: DarkModeService, private userManagementService: UserManagementService,
                private orderService: OrderService, private loadingService: LoadingService) {
        super();

        this.subscriptions.add(this.darkModeService.getHeaderColor().subscribe(headerColor => {
            this.headerColor = headerColor;
        }));

        this.subscriptions.add(this.userManagementService.getUser().subscribe(async user => {
            await this.loadingService.showLoading();

            this.orders = await this.orderService.getOrders(user);

            await this.loadingService.closeLoading();
        }));
    }

    async ngOnInit() {

    }

}
