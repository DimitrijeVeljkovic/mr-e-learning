import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { MockHttpClient } from '../../mocks/MockHttpClient';

const mockAuthData = {
  token: '12345',
  userId: '1',
  userName: 'test name',
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useClass: MockHttpClient }],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('api', () => {
    it('should call signup api', inject([HttpClient], (http: HttpClient) => {
      jest.spyOn(http, 'post');
      service.signup({
        firstName: 'first test',
        lastName: 'last test',
        userName: 'user test',
        email: 'email@test.com',
        password: 'passwordTest',
      });
      expect(http.post).toHaveBeenCalledWith(
        'http://localhost:8080/api/user/signup',
        {
          firstName: 'first test',
          lastName: 'last test',
          userName: 'user test',
          email: 'email@test.com',
          password: 'passwordTest',
        }
      );
    }));

    it('should call login api', inject([HttpClient], (http: HttpClient) => {
      jest.spyOn(http, 'post');
      service.login({
        email: 'email@test.com',
        password: 'passwordTest',
      });
      expect(http.post).toHaveBeenCalledWith(
        'http://localhost:8080/api/user/login',
        {
          email: 'email@test.com',
          password: 'passwordTest',
        }
      );
    }));

    it('should call verify api', inject([HttpClient], (http: HttpClient) => {
      jest.spyOn(http, 'post');
      service.verify({
        verificationCode: 'ABCDEF',
        userId: 1,
      });
      expect(http.post).toHaveBeenCalledWith(
        'http://localhost:8080/api/user/verify',
        {
          verificationCode: 'ABCDEF',
          userId: 1,
        }
      );
    }));

    it('should call get user data api', inject(
      [HttpClient],
      (http: HttpClient) => {
        jest.spyOn(http, 'get');
        jest.spyOn(service, 'getAuthData').mockReturnValue(mockAuthData);
        service.getUserData();
        expect(http.get).toHaveBeenCalledWith(
          'http://localhost:8080/api/user/1'
        );
      }
    ));

    it('should call update user data api', inject(
      [HttpClient],
      (http: HttpClient) => {
        jest.spyOn(http, 'put');
        jest.spyOn(service, 'getAuthData').mockReturnValue(mockAuthData);
        service.updateUserData({
          firstName: 'first test change',
          lastName: 'last test change',
          userName: 'user test change',
          password: 'passwordTestChange',
        });
        expect(http.put).toHaveBeenCalledWith(
          'http://localhost:8080/api/user/1',
          {
            firstName: 'first test change',
            lastName: 'last test change',
            userName: 'user test change',
            password: 'passwordTestChange',
          }
        );
      }
    ));

    it('should call delete user api', inject(
      [HttpClient],
      (http: HttpClient) => {
        jest.spyOn(http, 'delete');
        jest.spyOn(service, 'getAuthData').mockReturnValue(mockAuthData);
        service.deleteUser();
        expect(http.delete).toHaveBeenCalledWith(
          'http://localhost:8080/api/user/1'
        );
      }
    ));
  });

  describe('local storage', () => {
    let localStore: any = {};

    jest
      .fn(window.localStorage.getItem)
      .mockImplementation((key) =>
        key in localStore ? localStore[key] : null
      );
    jest
      .fn(window.localStorage.setItem)
      .mockImplementation((key, value) => (localStore[key] = `${value}`));
    jest
      .fn(window.localStorage.removeItem)
      .mockImplementation((key) => delete localStore[key]);

    it('should store auth data', () => {
      service.storeAuthData('010101', '1', 'testUser');
      expect(window.localStorage.getItem('token')).toEqual('010101');
      expect(window.localStorage.getItem('userId')).toEqual('1');
      expect(window.localStorage.getItem('userName')).toEqual('testUser');
    });

    it('should clear auth data', () => {
      service.storeAuthData('010101', '1', 'testUser');
      service.clearAuthData();
      expect(window.localStorage.getItem('token')).toBeNull();
      expect(window.localStorage.getItem('userId')).toBeNull();
      expect(window.localStorage.getItem('userName')).toBeNull();
    });

    it('should get auth data', () => {
      service.storeAuthData('010101', '1', 'testUser');
      expect(service.getAuthData()).toStrictEqual({
        token: '010101',
        userId: '1',
        userName: 'testUser',
      });
    });

    it('should change user name', () => {
      service.storeAuthData('010101', '1', 'testUser');
      service.changeUserName('newUserName');
      expect(window.localStorage.getItem('userName')).toEqual('newUserName');
    });

    describe('is authenticated', () => {
      it('yes', () => {
        service.storeAuthData('010101', '1', 'testUser');
        expect(service.isAuthenticated()).toBe(true);
      });

      it('no', () => {
        service.storeAuthData('010101', '1', 'testUser');
        service.clearAuthData();
        expect(service.isAuthenticated()).toBe(false);
      });
    });
  });
});
