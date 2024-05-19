import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { State } from 'src/app/enums/state';
import { Course } from 'src/app/interfaces/course';
import { UserService } from 'src/app/services/api/user.service';
import { CommentsModalComponent } from '../comments-modal/comments-modal.component';
import { CourseService } from 'src/app/services/api/course.service';
import { jsPDF } from 'jspdf';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { RatingService } from 'src/app/services/api/rating.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class CourseCardComponent implements OnInit {
  @Input() course: Course;
  @Input() state: State = State.ALL;
  @Input() dateFinished: string;
  @Input() percentage: number;

  public stars = [
    { rating: 1, color: 'dark', name: 'star-outline' },
    { rating: 2, color: 'dark', name: 'star-outline' },
    { rating: 3, color: 'dark', name: 'star-outline' },
    { rating: 4, color: 'dark', name: 'star-outline' },
    { rating: 5, color: 'dark', name: 'star-outline' },
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
    const sum = this.course?.ratings.reduce(
      (partialSum, a) => partialSum + a.rating,
      0
    );
    const numberOfRatings = this.course?.ratings.length;

    return numberOfRatings && sum
      ? `Rated with ${(sum / numberOfRatings).toFixed(2)} out of 5`
      : 'Rating not available';
  }

  constructor(
    private _courseService: CourseService,
    private _toastService: ToastService,
    private _ratingService: RatingService,
    private _modalController: ModalController,
    private _router: Router,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.userService.isAuthenticated()) {
      this._ratingService
        .getRatingForUser(
          this.course.courseId,
          +(this.userService.getAuthData().userId || 0)
        )
        .subscribe((result) => this._colorStars(result.rating));
    }
  }

  public async open() {
    const modal = await this._modalController.create({
      component: CommentsModalComponent,
      componentProps: { course: this.course },
    });
    return await modal.present();
  }

  public rateCourse(rating: number) {
    const newRating = {
      userId: +(this.userService.getAuthData().userId || 0),
      rating: rating,
    };

    this._ratingService
      .addRating(newRating, this.course.courseId)
      .subscribe((res) => {
        const userRatingForCourse = this.course.ratings.find(
          (rating) => rating.userId === newRating.userId
        );

        if (userRatingForCourse) {
          userRatingForCourse.rating = res.rating;
        } else {
          this.course.ratings.push({ ...newRating });
        }

        this._colorStars(rating);
      });
  }

  public startCourse() {
    this._courseService
      .startCourse({ courseId: this.course.courseId })
      .subscribe(
        (res) => {
          this._courseService.inProgressCounter$.next(
            this._courseService.inProgressCounter$.getValue() + 1
          );
          this._toastService.showToast(res.message);
          this._router.navigate(['/in-progress', this.course.courseId]);
        },
        (err) => {
          this._toastService.showToast(err.error.message, 'danger');
        }
      );
  }

  public bookmarkCourse() {
    this._courseService
      .bookmarkCourse({ courseId: this.course.courseId })
      .subscribe(
        (res) => {
          this._courseService.bookmarkCounter$.next(
            this._courseService.bookmarkCounter$.getValue() + 1
          );
          this._toastService.showToast(res.message);
        },
        (err) => {
          this._toastService.showToast(err.error.error, 'danger');
        }
      );
  }

  public downloadCertificate() {
    const doc = new jsPDF();

    doc.setFontSize(28);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');

    doc.text('Certificate of Excellence', 105, 40, { align: 'center' });

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');

    const content = `NJTeLearning certifies that\n\n${
      this.userService.getAuthData().userName
    }\n\nsuccessfully completed\n${this.course.title} course\non ${
      this.dateFinished
    }.`;

    doc.text(content, 105, 60, { align: 'center' });

    doc.setLineWidth(2);
    doc.rect(10, 120, 190, 100);
    doc.addImage(this.course.imageUrl, 'JPEG', 12, 122, 186, 96);

    doc.save(
      `${this.course.title} - ${this.userService.getAuthData().userName}.pdf`
    );
  }

  private _colorStars(rating: number) {
    this.stars = this.stars.map((star) => {
      if (star.rating <= rating) {
        return {
          rating: star.rating,
          color: 'warning',
          name: 'star',
        };
      }

      return {
        rating: star.rating,
        color: 'dark',
        name: 'star-outline',
      };
    });
  }
}
