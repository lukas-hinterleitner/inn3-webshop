import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    private loadingElement: HTMLIonLoadingElement;

    constructor(private loadingController: LoadingController) {
    }

    async showLoading(hideBackground: boolean = false) {
        this.loadingElement = await this.loadingController.create({
            spinner: 'crescent',
            message: 'Please wait...',
            backdropDismiss: false,
            keyboardClose: false,
            showBackdrop: true,
            cssClass: hideBackground ? 'hide-loading-background' : '',
        });
        await this.loadingElement.present();
    }

    async closeLoading() {
        await this.loadingElement.dismiss();
    }
}
