import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable, take, takeWhile, tap, timer } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { AuthState } from '../state/auth.reducer';
import * as authSelector from '../state/auth.selectors';
import * as AuthActions from '../state/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminGuard implements CanLoad, CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.authService.getVerifyAdminJWT().pipe(
      map(({ ok }) => {
        if (!ok) {
          this.router.navigate(['admin/login/pppp']);
          return false;
        }
        return true;
      })
    );
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.getVerifyAdminJWT().pipe(
      map(({ ok }) => {
        if (!ok) {
          this.router.navigate(['admin/login/pppp']);
          return false;
        }
        return true;
      })
    );
  }
}
