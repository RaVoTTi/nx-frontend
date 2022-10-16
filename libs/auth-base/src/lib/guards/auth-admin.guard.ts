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
import { AuthBaseService } from '../services/auth-base.service';
import { LocalStorageService } from '../services/local-storage.service';
// import { AuthState } from '../state/auth.reducer';
// import * as authSelector from '../state/auth.selectors';
// import * as AuthActions from '../state/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminGuard implements CanLoad, CanActivate {
  constructor(private router: Router, private authBaseService: AuthBaseService) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.authBaseService.getVerifyAdminJWT().pipe(
      map(({ ok }) => {
        if (!ok) {
          this.router.navigate(['/auth/admin/login/pppp']);
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
    return this.authBaseService.getVerifyAdminJWT().pipe(
      map(({ ok }) => {
        if (!ok) {
          this.router.navigate(['/auth/admin/login/pppp']);
          return false;
        }
        return true;
      })
    );
  }
}
