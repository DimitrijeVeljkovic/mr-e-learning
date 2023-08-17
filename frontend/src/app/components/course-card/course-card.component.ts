import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { State } from 'src/app/enums/state';
import { Course } from 'src/app/interfaces/course';
import { UserService } from 'src/app/services/user.service';
import { CommentsModalComponent } from '../comments-modal/comments-modal.component';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule ]
})
export class CourseCardComponent  implements OnInit {
  @Input() course: Course;
  @Input() state: State = State.ALL;

  public isModalOpen: boolean;

  get shouldShowBookmark(): boolean {
    return [State.ALL, State.IN_PROGRESS].includes(this.state);
  }

  get shouldShowContinue(): boolean {
    return this.state === State.IN_PROGRESS;
  }

  get shouldShowStart(): boolean {
    return [State.ALL, State.BOOKMARKED].includes(this.state);
  }

  get shouldShowCertificate(): boolean {
    return this.state === State.COMPLETED;
  }

  get courseRating(): string {
    const sum = this.course?.ratings.reduce((partialSum, a) => partialSum + a.rating, 0);
    const numberOfRatings = this.course?.ratings.length;

    return numberOfRatings && sum ? `Rated with ${(sum/numberOfRatings).toFixed(2)} out of 5` : 'Rating not available'
  }

  constructor(public userService: UserService,
              private _modalController: ModalController) { }

  ngOnInit() {}

  public async open() {
    const modal = await this._modalController.create({
      component: CommentsModalComponent,
      componentProps: { course: this.course }
    });
    return await modal.present();
  }

}
