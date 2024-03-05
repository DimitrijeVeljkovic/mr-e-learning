import { Component, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewDidEnter } from '@ionic/angular';
import { switchMap } from 'rxjs';
import { InProgressCourse } from 'src/app/interfaces/in-progress-course';
import { CourseService } from 'src/app/services/api/course.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/api/user.service';
import { NoteService } from 'src/app/services/api/note.service';
import { CommentService } from 'src/app/services/api/comment.service';
import { Comment } from 'src/app/interfaces/comment';

@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
})
export class CoursePage implements ViewDidEnter {
  public course: InProgressCourse | null = null;
  public selectedSegment: string = 'content';
  public disableTest = true;

  @HostListener('scroll', ['$event'])
  public onScroll($event: any): void {
    if (
      this.selectedSegment === 'content' &&
      this.disableTest &&
      $event.target.offsetHeight ===
        $event.target.scrollHeight - $event.target.scrollTop
    ) {
      this.disableTest = false;
      this._toastService.showToast('Test is now enabled!');
    }
  }

  public get myUserName(): string {
    return this._userService.getAuthData().userName || '';
  }

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _courseService: CourseService,
    private _noteService: NoteService,
    private _commentService: CommentService,
    private _toastService: ToastService,
    private _router: Router,
    public sanitizer: DomSanitizer
  ) {}

  ionViewDidEnter() {
    this._route.params
      .pipe(
        switchMap((params) =>
          this._courseService.getSingleInProgressCourse(+params['courseId'])
        )
      )
      .subscribe((res) => {
        this.course = res;
      });
  }

  public handleSegmentChange(event: any) {
    this.selectedSegment = event.detail.value;
  }

  public addNote(form: NgForm) {
    this._noteService
      .addNote(this.course?.course.courseId || 0, form.value)
      .subscribe(
        (res) => {
          this.course?.notes.push(res.note);
          form.resetForm();
        },
        (err) => {
          this._toastService.showToast(err.error.message, 'danger');
        }
      );
  }

  public deleteNote(noteId: number) {
    this._noteService.deleteNote(noteId).subscribe(
      (res) => {
        if (this.course) {
          this.course.notes = this.course.notes.filter(
            (note) => note.noteId !== noteId
          );
        }
        this._toastService.showToast(res.message);
      },
      (err) => {
        this._toastService.showToast(err.error.message, 'danger');
      }
    );
  }

  public postComment(form: NgForm) {
    this._commentService
      .postComment(
        {
          userId: +(this._userService.getAuthData().userId || 0),
          comment: form.value.comment,
        },
        this.course?.course?.courseId || 0
      )
      .subscribe(
        (res) => {
          if (this.course && this.course.course) {
            this.course.course.comments?.push(res);
          }
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
        if (this.course) {
          this.course.course.comments = this.course.course.comments?.filter(
            (c) => c.commentId !== comment.commentId
          );
        }
        this._toastService.showToast(res.message);
      },
      (err) => {
        this._toastService.showToast(err.error.message, 'danger');
      }
    );
  }

  public handleSubmitTest(form: NgForm) {
    const test = form.value;
    const body = Object.keys(test).map((key) => test[key]) as {
      questionId: number;
      answer: string;
    }[];

    this._courseService
      .submitTest(this.course?.course.courseId || 0, body)
      .subscribe(
        (res) => {
          this._courseService.inProgressCounter$.next(
            this._courseService.inProgressCounter$.getValue() - 1
          );
          this._courseService.completedCounter$.next(
            this._courseService.completedCounter$.getValue() + 1
          );
          this._toastService.showToast(res.message, 'success');
          this._router.navigate(['/completed']);
        },
        (err) => {
          this._toastService.showToast(err.error.message, 'danger');
          form.resetForm();
        }
      );
  }
}
