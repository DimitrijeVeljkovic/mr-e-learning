import { TestBed, inject } from '@angular/core/testing';

import { CommentService } from './comment.service';
import { HttpClient } from '@angular/common/http';
import { MockHttpClient } from '../../mocks/MockHttpClient';

describe('CommentService', () => {
  let service: CommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useClass: MockHttpClient }],
    });
    service = TestBed.inject(CommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('api', () => {
    it('should call post comment api', inject(
      [HttpClient],
      (http: HttpClient) => {
        jest.spyOn(http, 'post');
        service.postComment({ userId: 1, comment: 'test comment' }, 2);
        expect(http.post).toHaveBeenCalledWith(
          'http://localhost:8080/api/comment?courseId=2',
          { userId: 1, comment: 'test comment' }
        );
      }
    ));

    it('should call delete comment api', inject(
      [HttpClient],
      (http: HttpClient) => {
        jest.spyOn(http, 'delete');
        service.deleteComment(100);
        expect(http.delete).toHaveBeenCalledWith(
          'http://localhost:8080/api/comment/100'
        );
      }
    ));
  });
});
