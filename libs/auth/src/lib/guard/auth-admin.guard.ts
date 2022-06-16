import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>  {

    return this.authService.observeIsAuthenticated().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          console.log(false)
          this.router.navigate(['/auth/login']);
        }
      })
    );
    // const token = this.localStorageService.getToken();

    // if (token) {
    //   const tokenDecode = JSON.parse(atob(token.split('.')[1]))
    //   if(tokenDecode.isAdmin){

    //     console.log(true)
    //     return of(true);
    //   }

    // }
    // this.router.navigate(['/auth/login']);
    // return of(false);
  }
  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]
  // ): Observable<boolean> {
  //   return this.authService.observeIsAuthenticated().pipe(
  //     tap((isAuth) => {
  //       if (!isAuth) {
  //         this.router.navigate(['/auth/login']);
  //       }
  //     })
  //   );

  // }
  
}
