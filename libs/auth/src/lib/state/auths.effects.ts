import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import {  IUser } from 'interfaces/index';

import * as AuthsActions from './auths.actions';
import * as AuthsFeature from './auths.reducer';

@Injectable()
export class AuthsEffects {
  buildAuthSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthsActions.buildAuthSession),
      exhaustMap(() => {
        if (this.localStorageService.isValidToken()) {
          return this.authService.getUserByJWT().pipe(
            map(({result}) =>{

                return AuthsActions.buildAuthSessionSuccess({user: result})
            }),
            catchError(()=> of(AuthsActions.buildAuthSessionFailed()))
          )
        }
        return of(AuthsActions.buildAuthSessionFailed());
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private authService: AuthService,

    private localStorageService: LocalStorageService
  ) {}
}
