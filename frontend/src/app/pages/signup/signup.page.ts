import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  constructor(private _userService: UserService,
              private _toastService: ToastService) { }

  public handleSignup(form: NgForm) {
    this._userService.signup({ ...form.value }).subscribe(res => {
      form.resetForm();
      this._toastService.showToast(res.message);
    });
  }
}
