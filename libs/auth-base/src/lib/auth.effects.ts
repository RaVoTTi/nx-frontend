import { Injectable } from '@angular/core';
import { WishlistService } from '@frontend/book-base';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { AuthAction } from './actions/action-type';
import { LocalStorageService } from './services/local-storage.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthAction.login),
        tap((action) => {
          this.localStorage.setToken(action.token);
        })
      ),
    { dispatch: false }
  );
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthAction.logout),
        tap((action) => {
          this.localStorage.deleteToken();
          this.wishlistService.emptyBookWishlist();
        })
      ),
    { dispatch: false }
  );
  constructor(
    private wishlistService: WishlistService,
    private actions$: Actions,
    private localStorage: LocalStorageService
  ) {}
}
