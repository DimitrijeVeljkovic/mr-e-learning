import { Component } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { State } from 'src/app/enums/state';
import { CompletedCourse } from 'src/app/interfaces/completed-course';
import { CourseService } from 'src/app/services/api/course.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.page.html',
  styleUrls: ['./completed.page.scss'],
})
export class CompletedPage implements ViewDidEnter {
  public completedCourses: CompletedCourse[];
  public state: State = State.COMPLETED;

  constructor(private _courseService: CourseService) { }

  ionViewDidEnter() {
    this._courseService.getCompletedCourses().subscribe(res => {
      this.completedCourses = res;
    });
  }

}
