import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../../constants/api.constants';
import { Rating } from '../../interfaces/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private _http: HttpClient) { }

  public addRating(body: { userId: number, rating: number }, courseId: number): Observable<Rating> {
    return this._http.post(`${API_ROUTES.RATING.BASE}?courseId=${courseId}`, body) as Observable<Rating>;
  }

  public getRatingForUser(courseId: number, userId: number): Observable<Rating> {
    return this._http.get(`${API_ROUTES.RATING.BASE}?courseId=${courseId}&userId=${userId}`) as Observable<Rating>
  }
}
