import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private _userService: UserService,
              private _router: Router,
              private _toastService: ToastService) { }

  public handleLogin(form: NgForm) {
    this._userService.login({ ...form.value })
      .subscribe(
        res => {
          form.resetForm();
          this._userService.storeAuthData(res.token, res.user._id || '', res.user.userName || '');
          this._router.navigate(['/courses']);
        },
        err => {
          this._toastService.showToast(err.error.message);
        }
      );
  }
}
