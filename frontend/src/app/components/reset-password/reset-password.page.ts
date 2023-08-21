import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
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
              private _toastService: ToastService) { }

  public sendCode(form: NgForm) {
    this._userService.sendVerificationCode(form.value)
      .subscribe(
        res => {
          this.codeSent = true;
          this._toastService.showToast(res.message);
          form.resetForm();
        },
        err => {
          this.codeSent = false;
          this._toastService.showToast(err.error.message);
        }
      );
  }

  public resetPassword(form: NgForm) {
    this._userService.resetPassword(form.value)
      .subscribe(
        res => {
          this._toastService.showToast(res.message);
          this._router.navigate(['/login']);
          form.resetForm();
        },
        err => {
          this._toastService.showToast(err.error.message);
        }
      );
  }
}
