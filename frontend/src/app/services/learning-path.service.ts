import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LearningPath } from '../interfaces/learning-path';

@Injectable({
  providedIn: 'root'
})
export class LearningPathService {

  constructor(private _http: HttpClient) { }

  public getAllLearningPaths(): Observable<LearningPath[]> {
    return this._http.get('http://localhost:8080/api/learning-paths') as Observable<LearningPath[]>;
  }
}
