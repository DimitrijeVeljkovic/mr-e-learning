import { Component } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { State } from 'src/app/enums/state';
import { Course } from 'src/app/interfaces/course';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.page.html',
  styleUrls: ['./in-progress.page.scss'],
})
export class InProgressPage implements ViewDidEnter {
  public inProgressCourses: Course[];
  public state: State = State.IN_PROGRESS;

  constructor(private _userService: UserService) { }

  ionViewDidEnter() {
    this._userService.getInProgressCourses().subscribe(res => {
      this.inProgressCourses = res.map(r => r.course);
    });
  }

}
