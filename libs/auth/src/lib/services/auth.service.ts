// ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// OTHERS
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
// ME
import { ILogin, IUser, IRegister, IResponse } from 'interfaces/index';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router : Router
    
  ) {}

  postLogin(login: ILogin): Observable<IResponse<IUser>> {
    return this.http.post<IResponse<IUser>>(`${this.apiUrl}/auth/login`, login);
  }
  postRegister(user: IRegister): Observable<IResponse<IUser>> {
    return this.http.post<IResponse<IUser>>(
      `${this.apiUrl}/auth/register`,
      user
    );
  }

  logout() {
    this.localStorageService.deleteToken();
    this.router.navigate(['/login'])
  }
}

// verifyJWT(): Observable<boolean> {
//   const token = localStorage.getItem('super-token') || ''
//   if (token === '') {
//     return of(false)
//   }
//   const headers: HttpHeaders = new HttpHeaders()
//     .set('super-token', token)
//   return this.http.get<IResponse<IUser>>(this._apiUrl, { headers: this.headers })
//     .pipe(
//       tap((resp) => {
//         if (resp.ok) {
//           localStorage.setItem('super-token', resp.token!);
//         }
//       }),
//       map(resp => resp.ok),
//       catchError(err => of(false))
//     );

// }
