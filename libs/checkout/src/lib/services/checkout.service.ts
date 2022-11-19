import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { IOrder, IResponse } from '@frontend/utils';
import { firstValueFrom, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  postMyPlaceOrder(id: string): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${this.API_URL}/myorder/placeorder/${id}`,
      {}
    );
  }
  getMyPlaceOrder(id: string): Observable<IResponse<IOrder>> {
    return this.http.get<IResponse<IOrder>>(
      `${this.API_URL}/myorder/placeorder/${id}`
    );
  }

  patchSendPayment(orderId: string, token: string): Observable<IResponse<any>> {
    return this.http.patch<IResponse<any>>(
      `${this.API_URL}/order/checkout/${orderId}`,
      { token }
    );
  }
  getConfirmOrder(orderId: string): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${this.API_URL}/order/checkout/confirm/${orderId}`
    );
  }
  getEvaluationById(id: string): Observable<IResponse<IOrder>> {
    return this.http.get<IResponse<IOrder>>(
      `${this.API_URL}/order/evaluation/${id}`
    );
  }
  getEvaluationConfirm(id: string): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${this.API_URL}/order/evaluation/confirm/${id}`
    );
  }
}
