import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
  public courses: Course[] = [];

  constructor(private _courseService: CourseService) { }

  ngOnInit() {
    this._courseService.getAllCourses().subscribe(res => this.courses = res.courses);
  }

}
