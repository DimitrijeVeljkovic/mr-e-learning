import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LearningPath } from '../../interfaces/learning-path';
import { API_ROUTES } from '../../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class LearningPathService {

  constructor(private _http: HttpClient) { }

  public getAllLearningPaths(): Observable<LearningPath[]> {
    return this._http.get(API_ROUTES.LEARNING_PATHS.BASE) as Observable<LearningPath[]>;
  }
}
