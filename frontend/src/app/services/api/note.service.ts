import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ) { }

  public addNote(courseId: number, body: { newNote: string }): Observable<{ message: string, note: any }> {
    return this._http.post(`http://localhost:8080/api/notes?userId=${this._userService.getAuthData().userId}&courseId=${courseId}`, body) as Observable<{ message: string, note: any }>;
  }

  public deleteNote(noteId: number): Observable<{ message: string }> {
    return this._http.delete(`http://localhost:8080/api/notes?noteId=${noteId}`) as Observable<{ message: string }>;
  }
}
