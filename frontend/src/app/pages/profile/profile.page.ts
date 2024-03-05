import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewDidEnter } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements ViewDidEnter {
  public user: User = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
  };
  public deleteAccountAlertButtons = [
    {
      text: 'No',
      role: 'cancel',
    },
    {
      text: 'Yes',
      role: 'confirm',
      handler: () => {
        this.deleteUser();
      },
    },
  ];

  constructor(
    private _userService: UserService,
    private _toastService: ToastService,
    private _router: Router
  ) {}

  ionViewDidEnter() {
    this._userService.getUserData().subscribe((res) => {
      this.user = res;
    });
  }

  public changeUserData(form: NgForm) {
    this._userService.updateUserData(form.value).subscribe((res) => {
      this._userService.changeUserName(res.user.userName || '');
      this._toastService.showToast(res.message);
    });
  }

  public deleteUser() {
    this._userService.deleteUser().subscribe((res) => {
      this._userService.clearAuthData();
      this._router.navigate(['/login']);
      this._toastService.showToast(res.message);
    });
  }
}
