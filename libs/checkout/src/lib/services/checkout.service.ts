import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { IOrder, IResponse, IStripe } from '@frontend/utils';
import { StripeService } from 'ngx-stripe';
import { firstValueFrom, Observable, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient, private stripeService: StripeService) {}

  postMyPlaceOrder(id: string, price: number) {
    return this.http
      .post<IStripe>(`${this.API_URL}/myorder/placeorder/${id}`, {price})
      .pipe(
        switchMap(({ id }) => {
          return this.stripeService.redirectToCheckout({ sessionId: id });
        })
      );
  }
  getMyPlaceOrder(id: string): Observable<IResponse<IOrder>> {
    return this.http.get<IResponse<IOrder>>(
      `${this.API_URL}/myorder/placeorder/${id}`
    );
  }

  patchCheckout(orderId: string, token: string): Promise<any> {
    return this.http
      .patch<any>(`${this.API_URL}/myorder/checkout/${orderId}`, { token })
      .toPromise();
  }
  getConfirmOrder(orderId: string): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${this.API_URL}/myorder/confirm/${orderId}`
    );
  }
}
