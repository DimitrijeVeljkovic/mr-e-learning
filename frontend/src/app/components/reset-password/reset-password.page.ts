import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  public codeSent = false;

  constructor(private _userService: UserService,
              private _router: Router,
              private _toastController: ToastController) { }

  public sendCode(form: NgForm) {
    this._userService.sendVerificationCode(form.value)
      .subscribe(
        res => {
          this.codeSent = true;
          this.showToast(res.message);
          form.resetForm();
        },
        err => {
          this.codeSent = false;
          this.showToast(err.error.message);
        }
      );
  }

  public resetPassword(form: NgForm) {
    this._userService.resetPassword(form.value)
      .subscribe(
        res => {
          this.showToast(res.message);
          this._router.navigate(['/login']);
          form.resetForm();
        },
        err => {
          this.showToast(err.error.message);
        }
      );
  }

  public async showToast(message: string) {
    const toast = await this._toastController.create({
      message,
      duration: 5000
    });

    await toast.present();
  }
}
