import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { State } from 'src/app/enums/state';
import { Course } from 'src/app/interfaces/course';
import { UserService } from 'src/app/services/user.service';
import { CommentsModalComponent } from '../comments-modal/comments-modal.component';
import { CourseService } from 'src/app/services/course.service';
import { jsPDF } from 'jspdf';  
import html2canvas from 'html2canvas';  

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
  @Input() dateFinished: string;
  @Input() percentage: number;

  public stars = [
    { rating: 1, color: 'dark', name: 'star-outline' }, 
    { rating: 2, color: 'dark', name: 'star-outline' }, 
    { rating: 3, color: 'dark', name: 'star-outline' }, 
    { rating: 4, color: 'dark', name: 'star-outline' }, 
    { rating: 5, color: 'dark', name: 'star-outline' }
  ];

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
              private _courseService: CourseService,
              private _toastController: ToastController,
              private _modalController: ModalController) { }

  ngOnInit() {}

  public async open() {
    const modal = await this._modalController.create({
      component: CommentsModalComponent,
      componentProps: { course: this.course }
    });
    return await modal.present();
  }

  public rateCourse(rating: number) {
    this.stars = this.stars.map(star => {
      if (star.rating <= rating) {
        return {
          rating: star.rating,
          color: 'warning',
          name: 'star'
        }
      }

      return {
        rating: star.rating,
        color: 'dark',
        name: 'star-outline'
      }
    });

    const newRating = { 
      userName: this.userService.getAuthData().userName || '',
      rating: rating 
    };

    this._courseService.addRating(newRating, this.course._id)
      .subscribe(() => {
        this.course.ratings.push({ ...newRating, _id: '' });
      });
  }

  public startCourse() {
    this.userService.startCourse({ courseId: this.course._id })
      .subscribe(
        res => {
          this.showToast(res.message);
        }, 
        err => {
          this.showToast(err.error.message);
        }
      )
  }

  public bookmarkCourse() {
    this.userService.bookmarkCourse({ courseId: this.course._id })
      .subscribe(
        res => {
          this.showToast(res.message);
        }, 
        err => {
          this.showToast(err.error.message);
        }
      )
  }

  public downloadCertificate() {
    const doc = new jsPDF();
    doc.text(`${this.course.title} - Certification`, 10, 20);
    doc.text(`Issued by: MReLearning`, 10, 40);
    doc.text(`Completed by: ${this.userService.getAuthData().userName}`, 10, 60);
    doc.text(`Completed with score: ${this.percentage}%`, 10, 80);
    doc.text(`Completed on date: ${this.dateFinished}`, 10, 100);
    doc.save(`${this.course.title} - certification.pdf`);
  }

  public async showToast(message: string) {
    const toast = await this._toastController.create({
      message,
      duration: 5000
    });

    await toast.present();
  }
}
