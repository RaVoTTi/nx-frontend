import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import {environment} from '@env/environment'
import { IResponse, IUser } from 'interfaces/index';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiUrl
  constructor(private http: HttpClient) {}

  getUsers(state = ''): Observable<IResponse<IUser[]>> {
    return this.http.get<IResponse<IUser[]>>(
      `${this.apiUrl}/user/admin?state=${state}`
    );
  }

  getUserCount(): Observable<IResponse<number>> {
    return this.http.get<IResponse<number>>(
      `${this.apiUrl}/user/admin/count`
    );
  }
  getUserById(id: string): Observable<IResponse<IUser>> {
    return this.http.get<IResponse<IUser>>(
      `${this.apiUrl}/user/admin/${id}`
    );
  }
  postUser(user: IUser): Observable<IResponse> {
    return this.http
      .post<IResponse>(
        `${this.apiUrl}/user/admin`,
        user
      )
      .pipe(catchError((err) => of(err.error as IResponse)));
  }
  putUser(
    id: string,
    user: IUser,
  ): Observable<IResponse> {
    return this.http
      .put<IResponse>(
        `${this.apiUrl}/user/admin/${id}`,
        user
      )
      .pipe(catchError((err) => of(err.error as IResponse)));
  }
  deleteUser(id: string): Observable<IResponse> {
    return this.http
      .delete<IResponse>(
        `${this.apiUrl}/user/admin/${id}`
      )
      .pipe(catchError((err) => of(err.error as IResponse)));
  }
}
