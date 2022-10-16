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
import { isLoggedIn, isLoggedOut } from '../auth.selectors';
import { select, Store } from '@ngrx/store';
import { map, Observable, take, takeWhile, tap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedOut implements CanActivate {
  constructor(private store: Store, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(isLoggedOut),
      tap((loggedOut) => {
        if (!loggedOut) {
          this.router.navigateByUrl('/app/books');
        }
      })
    );
  }
}
