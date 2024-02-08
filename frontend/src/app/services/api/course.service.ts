import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../../interfaces/course';
import { Comment } from '../../interfaces/comment';
import { Rating } from '../../interfaces/rating';
import { UserService } from './user.service';
import { InProgressCourse } from 'src/app/interfaces/in-progress-course';
import { CompletedCourse } from 'src/app/interfaces/completed-course';

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
    return this._http.get('http://localhost:8080/api/courses') as Observable<Course[]>;
  }

  public getBookmarkedCourses(): Observable<{ course: Course }[]> {
    return this._http.get(`http://localhost:8080/api/courses/bookmark?userId=${this._userService.getAuthData().userId}`) as Observable<{ course: Course }[]>;
  }

  public getInProgressCourses(): Observable<InProgressCourse[]> {
    return this._http.get(`http://localhost:8080/api/courses/in-progress?userId=${this._userService.getAuthData().userId}`) as Observable<InProgressCourse[]>;
  }

  public getCompletedCourses(): Observable<CompletedCourse[]> {
    return this._http.get(`http://localhost:8080/api/courses/finish?userId=${this._userService.getAuthData().userId}`) as Observable<CompletedCourse[]>;
  }

  public startCourse(body: { courseId: number }): Observable<{ message: string }> {
    return this._http.post(`http://localhost:8080/api/courses/in-progress?userId=${this._userService.getAuthData().userId}`, body) as Observable<{ message: string }>;
  }

  public bookmarkCourse(body: { courseId: number }): Observable<{ message: string }> {
    return this._http.post(`http://localhost:8080/api/courses/bookmark?userId=${this._userService.getAuthData().userId}`, body) as Observable<{ message: string }>;
  }

  public postComment(body: { userId: number, comment: string }, courseId: number): Observable<Comment> {
    return this._http.post(`http://localhost:8080/api/courses/${courseId}/comment`, body) as Observable<Comment>;
  }

  public addRating(body: { userId: number, rating: number }, courseId: number): Observable<Rating> {
    return this._http.post(`http://localhost:8080/api/courses/${courseId}/rating`, body) as Observable<Rating>;
  }

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
    return this._http.get(`http://localhost:8080/api/courses/count${queryParams}`) as Observable<{
      courseCount: number,
      learningPathCount: number,
      inProgressCount: number,
      bookmarkCount: number,
      completeCount: number
    }>;
  }
}
