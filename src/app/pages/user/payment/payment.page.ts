import {Component, OnInit} from '@angular/core';
import {UnsubscribeOnDestroyAdapter} from '../../../utilities/unsubscribe-on-destroy-adapter';
import {DarkModeService} from '../../../services/dark-mode.service';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.page.html',
    styleUrls: ['./payment.page.scss'],
})
export class PaymentPage extends UnsubscribeOnDestroyAdapter implements OnInit {
    public headerColor: string;

    constructor(private darkModeService: DarkModeService) {
        super();

        this.subscriptions.add(this.darkModeService.getHeaderColor().subscribe(headerColor => {
            this.headerColor = headerColor;
        }));
    }

    ngOnInit() {
    }

}
