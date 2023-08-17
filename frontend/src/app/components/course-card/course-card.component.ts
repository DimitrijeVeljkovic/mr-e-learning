import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { State } from 'src/app/enums/state';
import { Course } from 'src/app/interfaces/course';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule ]
})
export class CourseCardComponent  implements OnInit {
  @Input() course: Course | null = null;
  @Input() state: State = State.ALL;

  get shouldShowBookmark() {
    return [State.ALL, State.IN_PROGRESS].includes(this.state);
  }

  get shouldShowContinue() {
    return this.state === State.IN_PROGRESS;
  }

  get shouldShowStart() {
    return [State.ALL, State.BOOKMARKED].includes(this.state);
  }

  get shouldShowCertificate() {
    return this.state === State.COMPLETED;
  }

  constructor(public userService: UserService) { }

  ngOnInit() {}

}
