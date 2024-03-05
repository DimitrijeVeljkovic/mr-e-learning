import { Component } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { State } from 'src/app/enums/state';
import { Course } from 'src/app/interfaces/course';
import { CourseService } from 'src/app/services/api/course.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss'],
})
export class BookmarksPage implements ViewDidEnter {
  public bookmarkedCourses: Course[];
  public state: State = State.BOOKMARKED;

  constructor(private _courseService: CourseService) {}

  ionViewDidEnter() {
    this._courseService.getBookmarkedCourses().subscribe((res) => {
      this.bookmarkedCourses = res.map((r) => r.course);
    });
  }
}
