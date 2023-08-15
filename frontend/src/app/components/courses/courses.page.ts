import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
  public allCourses: Course[] = [];
  public filteredCourses: Course[] = [];

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
