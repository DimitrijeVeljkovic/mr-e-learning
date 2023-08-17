import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/enums/state';
import { CompletedCourse } from 'src/app/interfaces/completed-course';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.page.html',
  styleUrls: ['./completed.page.scss'],
})
export class CompletedPage implements OnInit {
  public completedCourses: CompletedCourse[] = [];
  public state: State = State.COMPLETED;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this._userService.getCompletedCourses().subscribe(res => {
      this.completedCourses = res.finishedCourses;
    });
  }

}
