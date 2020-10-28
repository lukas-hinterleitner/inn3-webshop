import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async showToast(durationInMS: number, header: string, message: string, color: string) {
    const toast = await this.toastController.create({
      header,
      message,
      duration: durationInMS,
      color
    });

    await toast.present();
  }
}
