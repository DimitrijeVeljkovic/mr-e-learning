import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Course } from 'src/app/interfaces/course';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comments-modal',
  templateUrl: './comments-modal.component.html',
  styleUrls: ['./comments-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CommentsModalComponent {
  @Input() public course: Course;

  constructor(private _modalController: ModalController,
              private _courseService: CourseService,
              public userService: UserService) { }

  public close() {
    return this._modalController.dismiss(null, 'cancel');
  }

  public postComment(form: NgForm) {
    this._courseService.postComment({
      userId: +(this.userService.getAuthData().userId || 0),
      comment: form.value.comment
    }, this.course.courseId)
      .subscribe(res => {
        this.course.comments?.push(res);
        form.resetForm();
      })
  }

}
