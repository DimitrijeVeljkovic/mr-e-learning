import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private _toastController: ToastController) {}

  public async showToast(message: string, color?: string) {
    const toast = await this._toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color,
    });

    await toast.present();
  }
}
