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
// import { AuthFacade } from '../state/auth.facade';
import { WishlistService } from '@frontend/book-base';
import { Store } from '@ngrx/store';
import * as AuthActions from '../state/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL = environment.API_URL;
  // isAuthenticated$ : BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor(
    // private authFacade: AuthFacade,

    private http: HttpClient,
    private wishlistService:WishlistService,
    private localService : LocalStorageService,
    private store: Store,

    private router: Router
  ) {}

  login(login: ILogin) {
    this.store.dispatch(AuthActions.loginRequest({ login }));
  }

  postLogin(login: ILogin): Observable<IResponse> {
    return this.http
      .post<IResponse>(`${this.API_URL}/auth/login`, login)
      .pipe(catchError((err) => of(err.error as IResponse)));
  }
  getVerifyJWT(): Observable<IResponse> {
    return this.http
      .get<IResponse>(`${this.API_URL}/auth/verify`)
      .pipe(catchError((err) => of(err.error as IResponse)));
  }
  getVerifyAdminJWT(): Observable<IResponse> {
    return this.http
      .get<IResponse>(`${this.API_URL}/auth/verify/admin`)
      .pipe(catchError((err) => of(err.error as IResponse)));
  }

  postSignUp(user: IRegister): Observable<IResponse> {
    return this.http
      .post<IResponse>(`${this.API_URL}/auth/signup`, user)
      .pipe(catchError((err) => of(err.error as IResponse)));
  }

  loginJWT() {
    this.store.dispatch(AuthActions.loginJWT());
  }

  logout(route: string) {
    this.router.navigateByUrl(route);
    this.wishlistService.emptyBookWishlist();
    this.localService.deleteToken();
    this.store.dispatch(AuthActions.logout());
  }
  // initAppSession() {
  //   this.authFacade.buildAuthSession();
  // }

  // observeToken() {
  //   return this.authFacade.currentToken$;
  // }
  // observeIsAuth() {
  //   return this.authFacade.isAuth$;
  // }
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
