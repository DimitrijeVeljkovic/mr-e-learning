import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../../constants/api.constants';
import { Comment } from '../../interfaces/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private _http: HttpClient) {}

  public postComment(
    body: { userId: number; comment: string },
    courseId: number
  ): Observable<Comment> {
    return this._http.post(
      `${API_ROUTES.COMMENT.BASE}?courseId=${courseId}`,
      body
    ) as Observable<Comment>;
  }

  public deleteComment(commentId: number): Observable<{ message: string }> {
    return this._http.delete(
      `${API_ROUTES.COMMENT.BASE}/${commentId}`
    ) as Observable<{ message: string }>;
  }
}
