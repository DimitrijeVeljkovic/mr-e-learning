import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../interfaces/course';
import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  public courseCounter$: BehaviorSubject<number> = new BehaviorSubject(0);
  public learningPathCounter$: BehaviorSubject<number> = new BehaviorSubject(0);
  public inProgressCounter$: BehaviorSubject<number> = new BehaviorSubject(0);
  public bookmarkCounter$: BehaviorSubject<number> = new BehaviorSubject(0);
  public completedCounter$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private _http: HttpClient) { }

  public getAllCourses(): Observable<{ courses: Course[] }> {
    return this._http.get('http://localhost:3000/api/courses') as Observable<{courses: Course[]}>;
  }

  public postComment(body: { userName: string, comment: string }, courseId: string): Observable<{ comments: Comment[] }> {
    return this._http.post(`http://localhost:3000/api/courses/${courseId}/add-comment`, body) as Observable<{ comments: Comment[] }>;
  }

  public addRating(body: { userName: string, rating: number }, courseId: string): Observable<{ averageRating: number }> {
    return this._http.post(`http://localhost:3000/api/courses/${courseId}/add-rating`, body) as Observable<{ averageRating: number }>;
  }

  public getCounts(userId: string | null): Observable<{
    courseCount: number,
    learningPathCount: number,
    inProgressCount: number,
    bookmarkCount: number,
    completeCount: number
  }> {
    const queryParams = userId ? `?userId=${userId}` : '';
    return this._http.get(`http://localhost:3000/api/courses/count${queryParams}`) as Observable<{
      courseCount: number,
      learningPathCount: number,
      inProgressCount: number,
      bookmarkCount: number,
      completeCount: number
    }>;
  }
}
