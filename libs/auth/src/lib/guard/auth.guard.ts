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
import { Observable, of } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>  {
    const token = this.localStorageService.getToken();

    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]))
      if(tokenDecode.isAdmin){

        return of(true);
      }
      console.log('Sos un simple mortal')

    }
    this.router.navigate(['/login']);
    return of(false);
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
