import {Injectable} from '@angular/core';
import {UserData} from '../objects/user-data';
import {HttpClient} from '@angular/common/http';
import {DarkModeService} from './dark-mode.service';
import {UnsubscribeOnDestroyAdapter} from '../utilities/unsubscribe-on-destroy-adapter';

@Injectable({
    providedIn: 'root'
})
export class OrderService extends UnsubscribeOnDestroyAdapter {
    public headerColor: string;

    constructor(private httpClient: HttpClient, private darkModeService: DarkModeService) {
        super();

        this.subscriptions.add(this.darkModeService.getHeaderColor().subscribe(headerColor => {
            this.headerColor = headerColor;
        }));
    }

    async getOrders(user: UserData) {
        return await this.httpClient.get<PlacedOrder[]>('https://inn3-webshop.lukas-hinterleitner.at/api/orders/' + user.id, {}).toPromise()
            .then(response => {
                return response;
            })
            .catch(error => {
                return [];
            });
    }

    async getOrder(orderNumber: string) {
        return await this.httpClient.get<PlacedOrder>('https://inn3-webshop.lukas-hinterleitner.at/api/orders/' + orderNumber,
            {}).toPromise();
    }
}

export interface PlacedOrder {
    orderDate: Date;
    orderNumber: string;
    orderProducts: OrderProduct[];
    orderTotalCost: number;
}

export interface OrderProduct {
    amount: number;
    id: number;
    name: string;
    price: number;
}
