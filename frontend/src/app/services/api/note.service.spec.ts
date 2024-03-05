import { TestBed, inject } from '@angular/core/testing';

import { NoteService } from './note.service';
import { HttpClient } from '@angular/common/http';
import { MockHttpClient } from '../../mocks/MockHttpClient';
import { UserService } from './user.service';
import { MockUserService } from '../../mocks/MockUserService';

describe('NoteService', () => {
  let service: NoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useClass: MockHttpClient },
        { provide: UserService, useClass: MockUserService },
      ],
    });
    service = TestBed.inject(NoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('api', () => {
    it('should call add note api', inject(
      [HttpClient, UserService],
      (http: HttpClient, userService: UserService) => {
        jest.spyOn(http, 'post');
        jest.spyOn(userService, 'getAuthData').mockReturnValue({
          token: '12345',
          userId: '1',
          userName: 'test',
        });
        service.addNote(2, { newNote: 'test note' });
        expect(http.post).toHaveBeenCalledWith(
          'http://localhost:8080/api/notes?userId=1&courseId=2',
          { newNote: 'test note' }
        );
      }
    ));

    it('should call delete note api', inject(
      [HttpClient],
      (http: HttpClient) => {
        jest.spyOn(http, 'delete');
        service.deleteNote(10);
        expect(http.delete).toHaveBeenCalledWith(
          'http://localhost:8080/api/notes?noteId=10'
        );
      }
    ));
  });
});
