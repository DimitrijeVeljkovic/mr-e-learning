import { TestBed, inject } from '@angular/core/testing';

import { LearningPathService } from './learning-path.service';
import { HttpClient } from '@angular/common/http';
import { MockHttpClient } from '../../mocks/MockHttpClient';

describe('LearningPathService', () => {
  let service: LearningPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useClass: MockHttpClient }
      ]
    });
    service = TestBed.inject(LearningPathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('api', () => {
    it('should call get all learning paths api', inject([HttpClient], (http: HttpClient) => {
      jest.spyOn(http, 'get');
      service.getAllLearningPaths();
      expect(http.get).toHaveBeenCalledWith('http://localhost:8080/api/learning-paths');
    }));
  });
});
