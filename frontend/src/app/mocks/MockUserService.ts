import { of } from 'rxjs';

export class MockUserService {
  public signup() {
    return of(null);
  }

  public login() {
    return of(null);
  }

  public verify() {
    return of(null);
  }

  public storeAuthData() {}

  public clearAuthData() {}

  public getAuthData() {
    return null;
  }

  public changeUserName() {}

  public isAuthenticated() {
    return null;
  }

  public getUserData() {
    return of(null);
  }

  public updateUserData() {
    return of(null);
  }

  public deleteUser() {
    return of(null);
  }
}
