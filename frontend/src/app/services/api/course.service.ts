import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../../interfaces/course';
import { Rating } from '../../interfaces/rating';
import { UserService } from './user.service';
import { InProgressCourse } from 'src/app/interfaces/in-progress-course';
import { CompletedCourse } from 'src/app/interfaces/completed-course';
import { API_ROUTES } from 'src/app/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  public courseCounter$: BehaviorSubject<number> = new BehaviorSubject(0);
  public learningPathCounter$: BehaviorSubject<number> = new BehaviorSubject(0);
  public inProgressCounter$: BehaviorSubject<number> = new BehaviorSubject(0);
  public bookmarkCounter$: BehaviorSubject<number> = new BehaviorSubject(0);
  public completedCounter$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ) { }

  public getAllCourses(): Observable<Course[]> {
    return this._http.get(API_ROUTES.COURSES.BASE) as Observable<Course[]>;
  }

  public getBookmarkedCourses(): Observable<{ course: Course }[]> {
    return this._http.get(`${API_ROUTES.COURSES.BOOKMARK}?userId=${this._userService.getAuthData().userId}`) as Observable<{ course: Course }[]>;
  }

  public getInProgressCourses(): Observable<InProgressCourse[]> {
    return this._http.get(`${API_ROUTES.COURSES.IN_PROGRESS}?userId=${this._userService.getAuthData().userId}`) as Observable<InProgressCourse[]>;
  }

  public getSingleInProgressCourse(courseId: number): Observable<InProgressCourse> {
    return this._http.get(`${API_ROUTES.COURSES.IN_PROGRESS}/${courseId}?userId=${this._userService.getAuthData().userId}`) as Observable<InProgressCourse>;
  }

  public getCompletedCourses(): Observable<CompletedCourse[]> {
    return this._http.get(`${API_ROUTES.COURSES.FINISH}?userId=${this._userService.getAuthData().userId}`) as Observable<CompletedCourse[]>;
  }

  public startCourse(body: { courseId: number }): Observable<{ message: string }> {
    return this._http.post(`${API_ROUTES.COURSES.IN_PROGRESS}?userId=${this._userService.getAuthData().userId}`, body) as Observable<{ message: string }>;
  }

  public bookmarkCourse(body: { courseId: number }): Observable<{ message: string }> {
    return this._http.post(`${API_ROUTES.COURSES.BOOKMARK}?userId=${this._userService.getAuthData().userId}`, body) as Observable<{ message: string }>;
  }

  // ToDo: move in newly created RatingService
  public addRating(body: { userId: number, rating: number }, courseId: number): Observable<Rating> {
    return this._http.post(`http://localhost:8080/api/courses/${courseId}/rating`, body) as Observable<Rating>;
  }

  // ToDo: move in newly created RatingService
  public getRatingForUser(courseId: number, userId: number): Observable<Rating> {
    return this._http.get(`http://localhost:8080/api/courses/${courseId}/rating?userId=${userId}`) as Observable<Rating>
  }

  public getCounts(userId: string | null): Observable<{
    courseCount: number,
    learningPathCount: number,
    inProgressCount: number,
    bookmarkCount: number,
    completeCount: number
  }> {
    const queryParams = userId ? `?userId=${userId}` : '';
    return this._http.get(`${API_ROUTES.COURSES.COUNT}${queryParams}`) as Observable<{
      courseCount: number,
      learningPathCount: number,
      inProgressCount: number,
      bookmarkCount: number,
      completeCount: number
    }>;
  }

  public submitTest(courseId: number, body: { questionId: number, answer: string }[]): Observable<{ message: string }> {
    return this._http.post(`${API_ROUTES.COURSES.SUBMIT}/${courseId}?userId=${this._userService.getAuthData().userId}`, body) as Observable<{ message: string }>;
  }
}
