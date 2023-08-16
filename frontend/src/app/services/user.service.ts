import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  public signup(body: User): Observable<{ message: string, result: User }> {
    return this._http.post('http://localhost:3000/api/user/signup', body) as Observable<{ message: string, result: User }>;
  }

  public login(body: User): Observable<{ token: string, user: User }> {
    return this._http.post('http://localhost:3000/api/user/login', body) as Observable<{ token: string, user: User }>;
  }

  public storeAuthData(token: string, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }

  public clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  public getAuthData(): { token: string | null, userId: string | null } {
    return {
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId')
    }
  }

  public isAuthenticated(): boolean {
    return this.getAuthData().token !== null;
  }
}