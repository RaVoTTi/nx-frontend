import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IToken } from 'interfaces';
import { map, Observable, of, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { AuthState } from '../state/auth.reducer';
import * as authSelector from '../state/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate, CanLoad {
  isAuth$ = this.store.pipe(select(authSelector.selectIsAuth));

  constructor(
    private router: Router,
    private store: Store<AuthState>,
  ) {

    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.isAuth$.pipe(
      map((isAuth) => {
        if (!isAuth) {
          return true;
        }
        this.router.navigate(['/app/books']);
        return false;
      })
    );
    //   tap((isAuth) => {
    //     if (!isAuth) {
    //       this.router.navigate(['/auth/login']);
    //       return of(false);
    //     }
    //     return of(true);
    //   })
    // );
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.isAuth$.pipe(
      map((isAuth) => {
        if (!isAuth) {
          return true;
        }
        this.router.navigate(['/app']);
        return false;
      })
    );
  }
  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]
  // ):
  //   | Observable<boolean >

  //   | boolean{
  //   const token = this.localStorageService.getToken();

  //   if (token) {
  //     this.router.navigate(['/']);
  //     return true;
  //   }
  //   return false;
  // }
}
