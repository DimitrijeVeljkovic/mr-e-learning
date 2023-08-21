import { Component } from '@angular/core';
import { LearningPath } from 'src/app/interfaces/learning-path';
import { LearningPathService } from 'src/app/services/learning-path.service';
import { UserService } from 'src/app/services/user.service';
import { CommentsModalComponent } from '../../components/comments-modal/comments-modal.component';
import { Course } from 'src/app/interfaces/course';
import { ModalController, ViewDidEnter } from '@ionic/angular';
import { CourseService } from 'src/app/services/course.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-learning-paths',
  templateUrl: './learning-paths.page.html',
  styleUrls: ['./learning-paths.page.scss'],
})
export class LearningPathsPage implements ViewDidEnter {
  public learningPaths: LearningPath[] = [];
  public filteredPaths: LearningPath[];

  constructor(private _learningPathService: LearningPathService,
              private _modalController: ModalController,
              private _courseService: CourseService,
              private _toastService: ToastService,
              public userService: UserService) { }

  ionViewDidEnter() {
    this._learningPathService.getAllLearningPaths().subscribe(res => {
      this.learningPaths = res.learningPaths;
      this.filteredPaths = res.learningPaths;
    });
  }

  public handleSearch(event: any) {
    this.filteredPaths = this.learningPaths.filter(path => path.title.toUpperCase().includes(event.detail.value.toUpperCase()));
  }

  public startCourse(courseId: string) {
    this.userService.startCourse({ courseId })
      .subscribe(
        res => {
          this._courseService.inProgressCounter$.next(this._courseService.inProgressCounter$.getValue() + 1);
          this._toastService.showToast(res.message);
        }, 
        err => {
          this._toastService.showToast(err.error.message);
        }
      );
  }

  public bookmarkCourse(courseId: string) {
    this.userService.bookmarkCourse({ courseId })
      .subscribe(
        res => {
          this._courseService.bookmarkCounter$.next(this._courseService.bookmarkCounter$.getValue() + 1);
          this._toastService.showToast(res.message);
        }, 
        err => {
          this._toastService.showToast(err.error.message);
        }
      );
  }

  public async open(course: Course) {
    const modal = await this._modalController.create({
      component: CommentsModalComponent,
      componentProps: { course: course }
    });
    return await modal.present();
  }
}
