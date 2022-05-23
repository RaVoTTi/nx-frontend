// ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// OTHERS
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
// ME
import { ILogin, IUser, IRegister, IResponse } from 'interfaces/index';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  postLogin(login: ILogin): Observable<IResponse<IUser>> {
    return this.http.post<IResponse<IUser>>(`${this.apiUrl}/auth/login`, login);
  }
  postRegister(user: IRegister): Observable<IResponse<IUser>> {
    return this.http.post<IResponse<IUser>>(`${this.apiUrl}/auth/register`, user);
  }
}
