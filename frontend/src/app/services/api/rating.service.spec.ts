import { TestBed, inject } from '@angular/core/testing';

import { RatingService } from './rating.service';
import { HttpClient } from '@angular/common/http';
import { MockHttpClient } from '../../mocks/MockHttpClient';

describe('RatingService', () => {
  let service: RatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useClass: MockHttpClient }
      ]
    });
    service = TestBed.inject(RatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('api', () => {
    it('should call add rating api', inject([HttpClient], (http: HttpClient) => {
      jest.spyOn(http, 'post');
      service.addRating({ userId: 1, rating: 5 }, 2);
      expect(http.post).toHaveBeenCalledWith(
        'http://localhost:8080/api/rating?courseId=2',
        { userId: 1, rating: 5 }
      );
    }));

    it('should call get rating for user', inject([HttpClient], (http: HttpClient) => {
      jest.spyOn(http, 'get');
      service.getRatingForUser(2, 1);
      expect(http.get).toHaveBeenCalledWith('http://localhost:8080/api/rating?courseId=2&userId=1');
    }))
  });
});
