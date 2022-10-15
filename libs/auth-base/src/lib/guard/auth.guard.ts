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
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
private router:Router,
    private authBaseService: AuthBaseService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authBaseService.getVerifyJWT().pipe(map(({ ok }) => {
      if(!ok){
        this.router.navigate(['/auth/signup'])
        return false
      }
      return true
    }));
  }



  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.authBaseService.getVerifyJWT().pipe(map(({ ok }) => {
      if(!ok){
        this.router.navigate(['/auth/signup'])
        return false
      }
      return true
    }));
  }

}
