import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import {environment} from '@env/environment'
import { IResponse, IAutor } from '../../../../../interfaces/index';

@Injectable({
  providedIn: 'root',
})
export class AutorService {
  apiUrl = environment.apiUrl
  constructor(private http: HttpClient) {}

  getAutors(state = ''): Observable<IResponse<IAutor[]>> {
    return this.http.get<IResponse<IAutor[]>>(
      `${this.apiUrl}/autor?state=${state}`
    );
  }

  getAutorById(id: string): Observable<IResponse<IAutor>> {
    return this.http.get<IResponse<IAutor>>(
      `${this.apiUrl}/autor/${id}`
    );
  }
  postAutor(Autor: IAutor): Observable<IResponse> {
    return this.http
      .post<IResponse>(
        `${this.apiUrl}/autor`,
        Autor
      )
      .pipe(catchError((err) => of(err.error as IResponse)));
  }
  putAutor(
    id: string,
    Autor: IAutor,
  ): Observable<IResponse> {
    return this.http
      .put<IResponse>(
        `${this.apiUrl}/autor/${id}`,
        Autor
      )
      .pipe(catchError((err) => of(err.error as IResponse)));
  }
  deleteAutor(id: string): Observable<IResponse> {
    return this.http
      .delete<IResponse>(
        `${this.apiUrl}/autor/${id}`
      )
      .pipe(catchError((err) => of(err.error as IResponse)));
  }
}
