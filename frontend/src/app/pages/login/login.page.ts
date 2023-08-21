import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewDidLeave } from '@ionic/angular';
import { CourseService } from 'src/app/services/course.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements ViewDidLeave {

  constructor(private _userService: UserService,
              private _courseService: CourseService,
              private _router: Router,
              private _toastService: ToastService) { }

  ionViewDidLeave() {
    const userId = this._userService.isAuthenticated() ? this._userService.getAuthData().userId : null;
    this._courseService.getCounts(userId).subscribe(res => {
      console.log(res);
      this._courseService.courseCounter$.next(res.courseCount);
      this._courseService.learningPathCounter$.next(res.learningPathCount);

      if (this._userService.isAuthenticated()) {
        this._courseService.inProgressCounter$.next(res.inProgressCount);
        this._courseService.bookmarkCounter$.next(res.bookmarkCount);
        this._courseService.completedCounter$.next(res.completeCount);
      }
    });
  }

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
