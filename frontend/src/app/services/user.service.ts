import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { Course } from '../interfaces/course';
import { InProgressCourse } from '../interfaces/in-progress-course';
import { CompletedCourse } from '../interfaces/completed-course';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  public signup(body: User): Observable<{ message: string, result: User }> {
    return this._http.post('http://localhost:8080/api/user/signup', body) as Observable<{ message: string, result: User }>;
  }

  public login(body: User): Observable<{ token: string, result: User }> {
    return this._http.post('http://localhost:8080/api/user/login', body) as Observable<{ token: string, result: User }>;
  }

  public storeAuthData(token: string, userId: string, userName: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', userName);
  }

  public clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
  }

  public getAuthData(): { token: string | null, userId: string | null, userName: string | null } {
    return {
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId'),
      userName: localStorage.getItem('userName')
    }
  }

  public changeUserName(userName: string) {
    localStorage.setItem('userName', userName);
  }

  public isAuthenticated(): boolean {
    return this.getAuthData().token !== null;
  }

  public sendVerificationCode(body: { email: string }): Observable<{ message: string }> {
    return this._http.put('http://localhost:3000/api/user/send-code', body) as Observable<{ message: string }>;
  }

  public resetPassword(body: { email: string, newPassword: string, verificationCode: string }): Observable<{ message: string }> {
    return this._http.put('http://localhost:3000/api/user/reset-password', body) as Observable<{ message: string }>;
  }

  public getBookmarkedCourses(): Observable<{ course: Course }[]> {
    return this._http.get(`http://localhost:8080/api/user/${this.getAuthData().userId}/bookmarked-courses`) as Observable<{ course: Course }[]>;
  }

  public getInProgressCourses(): Observable<InProgressCourse[]> {
    return this._http.get(`http://localhost:8080/api/user/${this.getAuthData().userId}/in-progress-courses`) as Observable<InProgressCourse[]>;
  }

  public getCompletedCourses(): Observable<CompletedCourse[]> {
    return this._http.get(`http://localhost:8080/api/user/${this.getAuthData().userId}/finished-courses`) as Observable<CompletedCourse[]>;
  }

  public startCourse(body: { courseId: number }): Observable<{ message: string }> {
    return this._http.post(`http://localhost:8080/api/user/${this.getAuthData().userId}/start-course`, body) as Observable<{ message: string }>;
  }

  public bookmarkCourse(body: { courseId: number }): Observable<{ message: string }> {
    return this._http.post(`http://localhost:8080/api/user/${this.getAuthData().userId}/bookmark-course`, body) as Observable<{ message: string }>;
  }

  public getUserData(): Observable<User> {
    return this._http.get(`http://localhost:8080/api/user/${this.getAuthData().userId}`) as Observable<User>;
  }

  public updateUserData(body: User): Observable<{ message: string, user: User }> {
    return this._http.put(`http://localhost:8080/api/user/${this.getAuthData().userId}/change`, body) as Observable<{ message: string, user: User }>;
  }

  public deleteUser(): Observable<{ message: string }> {
    return this._http.delete(`http://localhost:8080/api/user/${this.getAuthData().userId}/delete`) as Observable<{ message: string }>;
  }

  public addNote(courseId: number, body: { newNote: string }): Observable<{ message: string, note: string }> {
    return this._http.post(`http://localhost:8080/api/user/${this.getAuthData().userId}/add-note/${courseId}`, body) as Observable<{ message: string, note: string }>;
  }

  public submitTest(courseId: number, body: { questionId: number, answer: string }[]): Observable<{ message: string }> {
    return this._http.post(`http://localhost:8080/api/user/${this.getAuthData().userId}/submit-test/${courseId}`, body) as Observable<{ message: string }>;
  }
}
