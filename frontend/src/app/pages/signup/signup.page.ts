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
  public timeForVerification = 120;
  public interval: any;
  
  private _userIdForVerification: number;

  constructor(
    private _userService: UserService,
    private _toastService: ToastService
  ) { }

  public handleSignup(form: NgForm) {
    this._userService.signup({ ...form.value })
      .subscribe(
        res => {
          this._userIdForVerification = +(res.result.userId || 0);
          this.shouldShowVerificationCard = true;
          this.interval = setInterval(() => {
            this.timeForVerification--;
            if (this.timeForVerification === 0) {
              this.shouldShowVerificationCard = false;
              this._userService.deleteUserWithId(this._userIdForVerification).subscribe();
              this._toastService.showToast('Timer expired! User is not created!', 'danger');
              form.resetForm();
              clearInterval(this.interval);
            }
          }, 1000);
        }, 
        err => {
          this.shouldShowVerificationCard = false;
          this._toastService.showToast(err.error.message, 'danger');
        }
      );
  }

  public handleVerification(form: NgForm) {
    console.log(form);
    this._userService.verify({ verificationCode: form.value.verificationCode, userId: this._userIdForVerification })
      .subscribe(
        res => {
          clearInterval(this.interval);
          this.shouldShowVerificationCard = false;
          this._toastService.showToast(res.message);
        },
        err => {
          this.timeForVerification = 120;
          this._toastService.showToast(err.error.message, 'danger');
        }
      )
  }
}
