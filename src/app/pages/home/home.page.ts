import {Component, OnInit} from '@angular/core';
import {DarkModeService} from '../../services/dark-mode.service';
import {UnsubscribeOnDestroyAdapter} from '../../utilities/unsubscribe-on-destroy-adapter';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage extends UnsubscribeOnDestroyAdapter implements OnInit {
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
