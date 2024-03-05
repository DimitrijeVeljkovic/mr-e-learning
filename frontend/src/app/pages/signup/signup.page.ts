import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  public shouldShowVerificationCard = false;

  private _userIdForVerification: number;

  constructor(
    private _userService: UserService,
    private _toastService: ToastService
  ) {}

  public handleSignup(form: NgForm) {
    this._userService.signup({ ...form.value }).subscribe(
      (res) => {
        this.shouldShowVerificationCard = true;
        this._userIdForVerification = +(res.result.userId || 0);
      },
      (err) => {
        this.shouldShowVerificationCard = false;
        this._toastService.showToast(err.error.message, 'danger');
      }
    );
  }

  public handleVerification(form: NgForm) {
    this._userService
      .verify({
        verificationCode: form.value.verificationCode,
        userId: this._userIdForVerification,
      })
      .subscribe(
        (res) => {
          this.shouldShowVerificationCard = false;
          this._toastService.showToast(res.message);
        },
        (err) => {
          this._toastService.showToast(err.error.message, 'danger');
        }
      );
  }
}
