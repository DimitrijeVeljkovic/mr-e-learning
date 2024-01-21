import { Component } from '@angular/core';
import { Course } from '../../interfaces/course';
import { CourseService } from 'src/app/services/api/course.service';
import { State } from 'src/app/enums/state';
import { ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements ViewDidEnter {
  public allCourses: Course[] = [];
  public filteredCourses: Course[];
  public state: State = State.ALL;

  constructor(private _courseService: CourseService) { }

  ionViewDidEnter() {
    this._courseService.getAllCourses().subscribe(res => {
      this.allCourses = res;
      this.filteredCourses = res;
    });
  }

  public handleSearch(event: any) {
    this.filteredCourses = this.allCourses.filter(course => course.title.toUpperCase().includes(event.detail.value.toUpperCase()));
  }

}
