import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import {environment} from '@env/environment'
import { IResponse, ISubject } from '@frontend/utils';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  API_URL = environment.API_URL
  constructor(private http: HttpClient) {}

  getSubjects(state = ''): Observable<IResponse<ISubject[]>> {
    return this.http.get<IResponse<ISubject[]>>(
      `${this.API_URL}/subject?state=${state}`
    );
  }

  getSubjectById(id: string): Observable<IResponse<ISubject>> {
    return this.http.get<IResponse<ISubject>>(
      `${this.API_URL}/subject/${id}`
    );
  }
  postSubject(subject: ISubject): Observable<IResponse> {
    return this.http
      .post<IResponse>(
        `${this.API_URL}/subject`,
        subject
      )
      .pipe(catchError((err) => of(err.error as IResponse)));
  }
  putSubject(
    id: string,
    subject: ISubject,
  ): Observable<IResponse> {
    return this.http
      .put<IResponse>(
        `${this.API_URL}/subject/${id}`,
        subject
      )
      .pipe(catchError((err) => of(err.error as IResponse)));
  }
  deleteSubject(id: string): Observable<IResponse> {
    return this.http
      .delete<IResponse>(
        `${this.API_URL}/subject/${id}`
      )
      .pipe(catchError((err) => of(err.error as IResponse)));
  }
}
