import { TestBed, inject } from '@angular/core/testing';

import { RatingService } from './rating.service';
import { HttpClient } from '@angular/common/http';

describe('RatingService', () => {
  let service: RatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('api', () => {
    it('should call add rating api', inject([HttpClient], (http: HttpClient) => {
      spyOn(http, 'post');
      service.addRating({ userId: 1, rating: 5 }, 2);
      expect(http.post).toHaveBeenCalledWith('http://localhost:8080/api/rating?courseId=2', { userId: 1, rating: 5 });
    }))
  });
});
