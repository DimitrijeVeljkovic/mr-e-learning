import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/course';
import { CourseService } from 'src/app/services/course.service';
import { State } from 'src/app/enums/state';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
  public allCourses: Course[] = [];
  public filteredCourses: Course[] = [];
  public state: State = State.ALL;

  constructor(private _courseService: CourseService) { }

  ngOnInit() {
    this._courseService.getAllCourses().subscribe(res => {
      this.allCourses = res.courses;
      this.filteredCourses = res.courses;
    });
  }

  public handleSearch(event: any) {
    this.filteredCourses = this.allCourses.filter(course => course.title.toUpperCase().includes(event.detail.value.toUpperCase()));
  }

}
