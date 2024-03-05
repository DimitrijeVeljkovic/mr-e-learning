import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthInterceptorService } from './auth-interceptor.service';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpRequest,
} from '@angular/common/http';
import { UserService } from '../services/api/user.service';
import { MockUserService } from '../mocks/MockUserService';

describe('AuthInterceptorService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: UserService, useClass: MockUserService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true,
        },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should add Authorization header to the request', inject(
    [UserService],
    (service: UserService) => {
      jest
        .spyOn(service, 'getAuthData')
        .mockReturnValue({ token: '12345', userId: '1', userName: 'testName' });

      const testUrl = 'https://example.com/api/data';
      const testData = { message: 'Test Data' };

      httpClient.get(testUrl).subscribe((response) => {
        expect(response).toEqual(testData);
      });

      const req = httpTestingController.expectOne(
        (request: HttpRequest<any>) => {
          return request.headers.has('Authorization');
        }
      );

      req.flush(testData);

      httpTestingController.verify();
    }
  ));

  afterEach(() => {
    httpTestingController.verify();
  });
});
