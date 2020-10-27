import { Injectable } from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingElement: HTMLIonLoadingElement;

  constructor(private loadingController: LoadingController) { }

  async showLoading() {
    this.loadingElement = await this.loadingController.create({
      spinner: 'crescent',
      message: 'Please wait...',
      backdropDismiss: false,
      keyboardClose: false
    });
    await this.loadingElement.present();
  }

  async closeLoading() {
    await this.loadingElement.dismiss();
  }
}
