import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private _http: HttpClient) { }

  public getAllCourses(): Observable<{ courses: Course[] }> {
    return this._http.get('http://localhost:3000/api/courses') as Observable<{courses: Course[]}>;
  }
}
