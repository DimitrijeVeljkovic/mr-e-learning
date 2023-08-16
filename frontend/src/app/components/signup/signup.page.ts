import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private _userService: UserService,
              private _toastController: ToastController) { }

  ngOnInit() {
  }

  public handleSignup(form: NgForm) {
    this._userService.signup({ ...form.value }).subscribe(res => {
      form.resetForm();
      this.showToast(res.message);
    });
  }

  public async showToast(message: string) {
    const toast = await this._toastController.create({
      message,
      duration: 5000
    });

    await toast.present();
  }
}
