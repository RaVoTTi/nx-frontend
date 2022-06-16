// ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// OTHERS
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { environment } from 'environments/environment';
// ME
import { ILogin, IUser, IRegister, IResponse } from 'interfaces/index';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { AuthsFacade } from '../state/auths.facade';
import { WishlistService } from '@frontend/book-base';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  // isAuthenticated$ : BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor(
    private authsFacade: AuthsFacade,
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private wishlistService: WishlistService,

    private router: Router
  ) {}

  postLogin(login: ILogin): Observable<IResponse<IUser>> {
    return this.http.post<IResponse<IUser>>(`${this.apiUrl}/auth/login`, login);
  }
  postSignUp(user: IRegister): Observable<IResponse> {
    return this.http
      .post<IResponse>(`${this.apiUrl}/auth/signup`, user)
      .pipe(catchError((err) => of(err.error as IResponse)));
  }
  getUserByJWT(): Observable<IResponse<IUser>> {
    return this.http.get<IResponse<IUser>>(`${this.apiUrl}/user`);
  }

  logout(route: string) {
    this.localStorageService.deleteToken();
    this.wishlistService.emptyBookWishlist();
    this.router.navigate([route]);
  }
  initAppSession() {
    this.authsFacade.buildAuthSession();
  }

  observeUser() {
    return this.authsFacade.currentUser$;
  }
  observeIsAuthenticated() {
    return this.authsFacade.isAuthenticated$;
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
