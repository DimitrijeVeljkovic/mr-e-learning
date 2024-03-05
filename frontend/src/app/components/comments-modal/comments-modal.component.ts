import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Comment } from 'src/app/interfaces/comment';
import { Course } from 'src/app/interfaces/course';
import { CommentService } from 'src/app/services/api/comment.service';
import { UserService } from 'src/app/services/api/user.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-comments-modal',
  templateUrl: './comments-modal.component.html',
  styleUrls: ['./comments-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CommentsModalComponent {
  @Input() public course: Course;

  constructor(
    private _modalController: ModalController,
    private _commentService: CommentService,
    private _toastService: ToastService,
    public userService: UserService
  ) {}

  public close() {
    return this._modalController.dismiss(null, 'cancel');
  }

  public postComment(form: NgForm) {
    this._commentService
      .postComment(
        {
          userId: +(this.userService.getAuthData().userId || 0),
          comment: form.value.comment,
        },
        this.course.courseId
      )
      .subscribe(
        (res) => {
          this.course.comments?.push(res);
          form.resetForm();
        },
        (err) => {
          this._toastService.showToast(err.error.message, 'danger');
        }
      );
  }

  public deleteComment(comment: Comment) {
    this._commentService.deleteComment(comment.commentId).subscribe(
      (res) => {
        this.course.comments = this.course.comments?.filter(
          (c) => c.commentId !== comment.commentId
        );
        this._toastService.showToast(res.message);
      },
      (err) => {
        this._toastService.showToast(err.error.message, 'danger');
      }
    );
  }
}
