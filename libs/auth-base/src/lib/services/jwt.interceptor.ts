import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { environment } from '@env/environment';
import { select, Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private store: Store,

    private localStorageService: LocalStorageService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // const token = this.store.pipe(select(tokenSelector)) ?? '';
    const token = this.localStorageService.getToken();

    const isApiUrl = request.url.startsWith(environment.API_URL);

    if (token && isApiUrl) {
      request = request.clone({
        setHeaders: {
          'super-token': token,
        },
      });
    }
    return next.handle(request);
  }
}
