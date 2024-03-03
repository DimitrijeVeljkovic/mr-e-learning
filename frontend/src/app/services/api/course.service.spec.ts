import { TestBed, inject } from '@angular/core/testing';

import { CourseService } from './course.service';
import { HttpClient } from '@angular/common/http';
import { MockUserService } from '../../mocks/MockUserService';
import { MockHttpClient } from '../../mocks/MockHttpClient';
import { UserService } from './user.service';

const mockAuthData = {
  token: '12345',
  userId: '1',
  userName: 'test name'
};

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useClass: MockHttpClient },
        { provide: UserService, useClass: MockUserService }
      ]
    });
    service = TestBed.inject(CourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('api', () => {
    it('should call get all courses api', inject([HttpClient], (http: HttpClient) => {
      jest.spyOn(http, 'get');
      service.getAllCourses();
      expect(http.get).toHaveBeenCalledWith('http://localhost:8080/api/courses');
    }));

    it('should call get bookmarked courses api', inject([HttpClient, UserService], (http: HttpClient, userService: UserService) => {
      jest.spyOn(http, 'get');
      jest.spyOn(userService, 'getAuthData').mockReturnValue(mockAuthData);
      service.getBookmarkedCourses();
      expect(http.get).toHaveBeenCalledWith('http://localhost:8080/api/courses/bookmark?userId=1');
    }));

    it('should call get in progress courses api', inject([HttpClient, UserService], (http: HttpClient, userService: UserService) => {
      jest.spyOn(http, 'get');
      jest.spyOn(userService, 'getAuthData').mockReturnValue(mockAuthData);
      service.getInProgressCourses();
      expect(http.get).toHaveBeenCalledWith('http://localhost:8080/api/courses/in-progress?userId=1');
    }));

    it('should call get single in progress course api', inject([HttpClient, UserService], (http: HttpClient, userService: UserService) => {
      jest.spyOn(http, 'get');
      jest.spyOn(userService, 'getAuthData').mockReturnValue(mockAuthData);
      service.getSingleInProgressCourse(2);
      expect(http.get).toHaveBeenCalledWith('http://localhost:8080/api/courses/in-progress/2?userId=1');
    }));

    it('should call get completed courses api', inject([HttpClient, UserService], (http: HttpClient, userService: UserService) => {
      jest.spyOn(http, 'get');
      jest.spyOn(userService, 'getAuthData').mockReturnValue(mockAuthData);
      service.getCompletedCourses();
      expect(http.get).toHaveBeenCalledWith('http://localhost:8080/api/courses/finish?userId=1');
    }));

    it('should call start course api', inject([HttpClient, UserService], (http: HttpClient, userService: UserService) => {
      jest.spyOn(http, 'post');
      jest.spyOn(userService, 'getAuthData').mockReturnValue(mockAuthData);
      service.startCourse({ courseId: 2 });
      expect(http.post).toHaveBeenCalledWith(
        'http://localhost:8080/api/courses/in-progress?userId=1',
        { courseId: 2 }
      );
    }));

    it('should call bookmark course api', inject([HttpClient, UserService], (http: HttpClient, userService: UserService) => {
      jest.spyOn(http, 'post');
      jest.spyOn(userService, 'getAuthData').mockReturnValue(mockAuthData);
      service.bookmarkCourse({ courseId: 2 });
      expect(http.post).toHaveBeenCalledWith(
        'http://localhost:8080/api/courses/bookmark?userId=1',
        { courseId: 2 }
      );
    }));

    it('should call submit test api', inject([HttpClient, UserService], (http: HttpClient, userService: UserService) => {
      jest.spyOn(http, 'post');
      jest.spyOn(userService, 'getAuthData').mockReturnValue(mockAuthData);
      service.submitTest(2, [
        { questionId: 1, answer: 'test answer 1' },
        { questionId: 2, answer: 'test answer 2' },
      ]);
      expect(http.post).toHaveBeenCalledWith(
        'http://localhost:8080/api/courses/submit/2?userId=1',
        [
          { questionId: 1, answer: 'test answer 1' },
          { questionId: 2, answer: 'test answer 2' },
        ]
      );
    }));

    describe('should call get counts api', () => {
      it('should call with user id', inject([HttpClient], (http: HttpClient) => {
        jest.spyOn(http, 'get');
        service.getCounts('1');
        expect(http.get).toHaveBeenCalledWith('http://localhost:8080/api/courses/count?userId=1');
      }));

      it('should call without user id', inject([HttpClient], (http: HttpClient) => {
        jest.spyOn(http, 'get');
        service.getCounts(null);
        expect(http.get).toHaveBeenCalledWith('http://localhost:8080/api/courses/count');
      }));
    });
  })
});
