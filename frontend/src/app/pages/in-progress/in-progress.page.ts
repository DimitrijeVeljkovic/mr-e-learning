import { Component } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { State } from 'src/app/enums/state';
import { InProgressCourse } from 'src/app/interfaces/in-progress-course';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.page.html',
  styleUrls: ['./in-progress.page.scss'],
})
export class InProgressPage implements ViewDidEnter {
  public inProgressCourses: InProgressCourse[];
  public state: State = State.IN_PROGRESS;

  constructor(private _userService: UserService) { }

  ionViewDidEnter() {
    this._userService.getInProgressCourses().subscribe(res => {
      this.inProgressCourses = res.inProgressCourses;
    });
  }

}
