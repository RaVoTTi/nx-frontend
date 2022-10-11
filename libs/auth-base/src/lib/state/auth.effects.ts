import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from '@frontend/book-base';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { IToken } from 'interfaces';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  loginRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      exhaustMap((action) => {
        return this.authService.postLogin(action.login).pipe(
          map((response) => {
            if (response.ok && response.token) {
              return AuthActions.loginSuccess({
                isAuth: true,
                token: response.token,
              });
            }
            return AuthActions.loginFailure({ error: 'Error en el login' });
          }),
          catchError((error) => of(AuthActions.loginFailure(error)))
        );
      })
    );
  });
  loginJWT$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginJWT),
      exhaustMap(() => {
        const token = this.localService.getToken();

        if (token) {
          const tokenDecode = this.localService.decodeJWT(token);
          if (!this.localService.isExpiredToken(tokenDecode?.exp)) {
            // if(token.isAdmin === true){
            //   return this.authService
            // }
            return this.authService.getVerifyJWT().pipe(
              map((response) => {
                if (response.ok) {
                  return AuthActions.verifySuccess({ isAuth: true, token });
                }
                return AuthActions.loginFailure({ error: "Token isn't valid" });
              }),
              catchError(() =>
                of(AuthActions.loginFailure({ error: "Token isn't valid" }))
              )
            );
          }
        }
        return of(AuthActions.loginFailure({ error: "Token isn't valid" }));
      })
    );
  });

  loginSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((response) => {
          this.localService.setToken(response.token);
          this.router.navigateByUrl('/app');
        })
      );
    },
    { dispatch: false }
  );
  // logout$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(AuthActions.logout),
  //     tap(() => {
  //       this.router.navigateByUrl('/app');
  //       this.wishlistService.emptyBookWishlist();
  //       this.localService.deleteToken();

  //     })
  //   );
  // });
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private localService: LocalStorageService,
    private wishlistService: WishlistService
  ) {}
}

// exhaustMap(action) => {

//     return this.authService.postLogin({action.login }).pipe(
//         map((response) =>{ return  AuthActions.loginSuccess({isAuth: response.ok token:response.token})}
//         )
//         .catchError((error) =>{ return of(AuthActions.loginFailure({error}))})
//     }
//     )
// }
