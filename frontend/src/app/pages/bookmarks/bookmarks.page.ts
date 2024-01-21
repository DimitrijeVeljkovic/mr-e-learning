import { Component } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { State } from 'src/app/enums/state';
import { Course } from 'src/app/interfaces/course';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss'],
})
export class BookmarksPage implements ViewDidEnter {
  public bookmarkedCourses: Course[];
  public state: State = State.BOOKMARKED;

  constructor(private _userService: UserService) { }

  ionViewDidEnter() {
    this._userService.getBookmarkedCourses().subscribe(res => {
      this.bookmarkedCourses = res.map(r => r.course);
    });
  }

}
