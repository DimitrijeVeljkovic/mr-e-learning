import { Component } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { State } from 'src/app/enums/state';
import { Course } from 'src/app/interfaces/course';
import { CourseService } from 'src/app/services/api/course.service';

@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.page.html',
  styleUrls: ['./in-progress.page.scss'],
})
export class InProgressPage implements ViewDidEnter {
  public inProgressCourses: Course[];
  public state: State = State.IN_PROGRESS;

  constructor(private _courseService: CourseService) { }

  ionViewDidEnter() {
    this._courseService.getInProgressCourses().subscribe(res => {
      this.inProgressCourses = res.map(r => r.course);
    });
  }

}
