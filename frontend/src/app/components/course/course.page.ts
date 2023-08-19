import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { combineLatest, forkJoin, of, switchMap } from 'rxjs';
import { InProgressCourse } from 'src/app/interfaces/in-progress-course';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
})
export class CoursePage implements OnInit {
  public course: InProgressCourse | null = null;
  public selectedSegment: string = 'content';

  constructor(private _route: ActivatedRoute,
              private _userService: UserService,
              private _courseService: CourseService,
              private _toastController: ToastController,
              private _router: Router,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {
    combineLatest([
      this._route.params,
      this._userService.getInProgressCourses()
    ]).subscribe(([params, inProgress]) => {
      const courseId = params['courseId'];
      const inProgressCourses = inProgress.inProgressCourses;
      
      this.course = inProgressCourses.find(c => c.course._id === courseId)!;
      console.log(this.course.course.finalTest);
    });
  }

  public handleSegmentChange(event: any) {
    this.selectedSegment = event.detail.value;
  }

  public addNote(form: NgForm) {
    this._userService.addNote(this.course?.course._id || '', form.value)
      .subscribe(res => {
        this.course?.notes.push(res.note);
        form.resetForm();
      });
  }

  public postComment(form: NgForm) {
    this._courseService.postComment({
      userName: this._userService.getAuthData().userName || '',
      comment: form.value.comment
    }, this.course?.course?._id || '')
      .subscribe(res => {
        if (this.course && this.course.course) {
          this.course.course.comments = res.comments;
        }
        form.resetForm();
      })
  }

  public handleSubmitTest(form: NgForm) {
    const test = form.value;
    const body = Object.keys(test).map(key => test[key]) as { question: string; answer: string; }[];
    
    this._userService.submitTest(this.course?.course._id || '', body)
      .subscribe(
        res => {
          this.showToast(`${res.message} Percentage: ${res.finishedCourse.percentage}%`, 'success');
          this._router.navigate(['/completed']);
        },
        err => {
          this.showToast(`${err.error.message} Percentage: ${err.error.percentCorrect}%`, 'danger');
          form.resetForm();
        }
      );
  }

  public async showToast(message: string, color: string) {
    const toast = await this._toastController.create({
      message,
      duration: 5000,
      color
    });

    await toast.present();
  }
}
