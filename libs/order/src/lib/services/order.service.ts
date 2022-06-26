import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import { IResponse, IOrder, ICheckout } from 'interfaces/index';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiUrl = environment.apiUrl;
  result = environment.result
  constructor(private http: HttpClient) {}

  // USER
  getMyOrders(condition: number): Observable<IResponse<IOrder[]>> {
    return this.http.get<IResponse<IOrder[]>>(
      `${this.apiUrl}/order/user?condition=${condition}`
    );
  }
  getMyOrderById(id: string): Observable<IResponse<IOrder>> {
    return this.http.get<IResponse<IOrder>>(`${this.apiUrl}/order/user/${id}`);
  }
  postMyOrder(id: string, checkout: ICheckout): Observable<IResponse> {
    return this.http
      .post<IResponse>(`${this.apiUrl}/order/checkout/${id}`, checkout)
      .pipe(catchError((err) => of(err.error as IResponse)));
  }
  patchMyOrder(id: string): Observable<IResponse> {
    return this.http
      .patch<IResponse>(`${this.apiUrl}/order/evaluation/${id}`, {result:this.result})
      .pipe(catchError((err) => of(err.error as IResponse)));
  }

  // ADMIN
  getOrders(state = ''): Observable<IResponse<IOrder[]>> {
    return this.http.get<IResponse<IOrder[]>>(
      `${this.apiUrl}/order/admin?state=${state}`
    );
  }
  getOrderCount(): Observable<IResponse<number>> {
    return this.http.get<IResponse<number>>(`${this.apiUrl}/order/admin/count`);
  }
  getOrderIncome(): Observable<IResponse<number>> {
    return this.http.get<IResponse<number>>(
      `${this.apiUrl}/order/admin/income`
    );
  }
  getOrderById(id: string): Observable<IResponse<IOrder>> {
    return this.http.get<IResponse<IOrder>>(`${this.apiUrl}/order/admin/${id}`);
  }
  patchOrder(id: string, condition: number): Observable<IResponse> {
    return this.http
      .patch<IResponse>(`${this.apiUrl}/order/admin/${id}`, { condition })
      .pipe(catchError((err) => of(err.error as IResponse)));
  }
  // putOrder(
  //   id: string,
  //   order: IOrder,
  // ): Observable<IResponse> {
  //   return this.http
  //     .put<IResponse>(
  //       `${this.apiUrl}/order/${id}`,
  //       order
  //     )
  //     .pipe(catchError((err) => of(err.error as IResponse)));
  // }
  deleteOrder(id: string): Observable<IResponse> {
    return this.http
      .delete<IResponse>(`${this.apiUrl}/order/admin/${id}`)
      .pipe(catchError((err) => of(err.error as IResponse)));
  }
}
