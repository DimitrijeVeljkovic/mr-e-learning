import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public userService: UserService,
              private _router: Router) {}

  public handleLogOut() {
    this.userService.clearAuthData();
    this._router.navigate(['/courses']);
  }
}
