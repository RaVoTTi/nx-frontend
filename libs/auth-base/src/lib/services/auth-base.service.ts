// ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// OTHERS
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { environment } from 'environments/environment';
// ME
import { ILogin, IUser,  IResponse } from 'interfaces/index';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
// import { AuthFacade } from '../state/auth.facade';
import { WishlistService } from '@frontend/book-base';
import { Store } from '@ngrx/store';
import { IRegister } from '../interfaces/IRegister';

@Injectable({
  providedIn: 'root',
})
export class AuthBaseService {
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
    // this.store.dispatch(AuthActions.loginRequest({ login }));
  }

  postLogin(login: ILogin): Observable<IResponse> {
    return this.http
      .post<IResponse>(`${this.API_URL}/auth/login`, login)

  }
  postLoginAdmin(login: ILogin): Observable<IResponse> {
    return this.http
      .post<IResponse>(`${this.API_URL}/auth/login/admin`, login)

  }
  getVerifyJWT(): Observable<IResponse> {
    return this.http
      .get<IResponse>(`${this.API_URL}/auth/verify`)

  }
  getVerifyAdminJWT(): Observable<IResponse> {
    return this.http
      .get<IResponse>(`${this.API_URL}/auth/verify/admin`)

  }

  postSignUp(user: IRegister): Observable<IResponse> {
    return this.http
      .post<IResponse>(`${this.API_URL}/auth/signup`, user)

  }

  loginJWT() {
    // this.store.dispatch(AuthActions.loginJWT());
  }

  logout(route: string) {
    this.router.navigateByUrl(route);
    this.wishlistService.emptyBookWishlist();
    this.localService.deleteToken();
    // this.store.dispatch(AuthActions.logout());
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
