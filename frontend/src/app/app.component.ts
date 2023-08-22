import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { CourseService } from './services/course.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private _router: Router,
              public courseService: CourseService,
              public userService: UserService) {}

  ngOnInit() {
    const userId = this.userService.isAuthenticated() ? this.userService.getAuthData().userId : null;
    this.courseService.getCounts(userId).subscribe(res => {
      this.courseService.courseCounter$.next(res.courseCount);
      this.courseService.learningPathCounter$.next(res.learningPathCount);

      if (this.userService.isAuthenticated()) {
        this.courseService.inProgressCounter$.next(res.inProgressCount);
        this.courseService.bookmarkCounter$.next(res.bookmarkCount);
        this.courseService.completedCounter$.next(res.completeCount);
      }
    });
  }

  public handleLogOut() {
    this.userService.clearAuthData();
    this._router.navigate(['/courses']);
  }

}
