import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LearningPath } from '../interfaces/learning-path';

@Injectable({
  providedIn: 'root'
})
export class LearningPathService {

  constructor(private _http: HttpClient) { }

  public getAllLearningPaths(): Observable<{ learningPaths: LearningPath[] }> {
    return this._http.get('http://localhost:3000/api/learning-paths') as Observable<{ learningPaths: LearningPath[] }>;
  }
}
