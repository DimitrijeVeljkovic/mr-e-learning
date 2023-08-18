import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../interfaces/course';
import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

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
}
