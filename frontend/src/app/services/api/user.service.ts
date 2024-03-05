import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  public signup(body: User): Observable<{ message: string; result: User }> {
    return this._http.post(API_ROUTES.USER.SIGNUP, body) as Observable<{
      message: string;
      result: User;
    }>;
  }

  public login(body: User): Observable<{ token: string; result: User }> {
    return this._http.post(API_ROUTES.USER.LOGIN, body) as Observable<{
      token: string;
      result: User;
    }>;
  }

  public verify(body: {
    verificationCode: string;
    userId: number;
  }): Observable<{ message: string }> {
    return this._http.post(API_ROUTES.USER.VERIFY, body) as Observable<{
      message: string;
    }>;
  }

  public getUserData(): Observable<User> {
    return this._http.get(
      `${API_ROUTES.USER.BASE}/${this.getAuthData().userId}`
    ) as Observable<User>;
  }

  public updateUserData(
    body: User
  ): Observable<{ message: string; user: User }> {
    return this._http.put(
      `${API_ROUTES.USER.BASE}/${this.getAuthData().userId}`,
      body
    ) as Observable<{ message: string; user: User }>;
  }

  public deleteUser(): Observable<{ message: string }> {
    return this._http.delete(
      `${API_ROUTES.USER.BASE}/${this.getAuthData().userId}`
    ) as Observable<{ message: string }>;
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

  public getAuthData(): {
    token: string | null;
    userId: string | null;
    userName: string | null;
  } {
    return {
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId'),
      userName: localStorage.getItem('userName'),
    };
  }

  public changeUserName(userName: string) {
    localStorage.setItem('userName', userName);
  }

  public isAuthenticated(): boolean {
    return this.getAuthData().token !== null;
  }
}
