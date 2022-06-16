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
import { IToken } from 'interfaces';
import { Observable, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.observeIsAuthenticated().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['/auth/login']);
        }
      })
    );

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> {
    return this.authService.observeIsAuthenticated().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['/auth/login']);
        }
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
