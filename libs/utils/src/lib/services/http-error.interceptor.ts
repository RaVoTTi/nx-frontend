import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private alert: AlertService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error) => {
        const errorMessage = 'No internet connection or Server Error';

    

        // aquí podrías agregar código que muestre el error en alguna parte fija de la pantalla.
        this.alert.fire(
          {
            title: 'Connect to Internet',
            text: 'Or try later',
            icon: 'error',
          },
          {
            urlConfi: '/app/books', // 🔴 TODOOO
            urlCancel: '/app/books',
          }
        );
        return throwError(() => Error(errorMessage));
      })
    );
  }
}
