import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { UserService } from '../services/api/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { MockUserService } from '../mocks/MockUserService';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let userService: UserService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: UserService, useClass: MockUserService },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
  });

  it('should allow activation when the user is authenticated', () => {
    jest.spyOn(userService, 'isAuthenticated').mockReturnValue(true);

    const canActivateResult = guard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(canActivateResult).toBe(true);
  });

  it('should navigate to "/login" and return false when the user is not authenticated', () => {
    jest.spyOn(userService, 'isAuthenticated').mockReturnValue(false);
    jest.spyOn(router, 'navigate');

    const canActivateResult = guard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(canActivateResult).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
