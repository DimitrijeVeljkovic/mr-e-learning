import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { catchError, of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private _userService: UserService,
              private _router: Router,
              private _toastController: ToastController) { }

  ngOnInit() {
  }

  public handleLogin(form: NgForm) {
    this._userService.login({ ...form.value })
      .subscribe(
        res => {
          form.resetForm();
          this._userService.storeAuthData(res.token, res.user._id || '');
          this._router.navigate(['/courses']);
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
