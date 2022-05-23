import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import { IResponse, IOrder } from 'interfaces/index';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getOrders(state = ''): Observable<IResponse<IOrder[]>> {
    return this.http.get<IResponse<IOrder[]>>(
      `${this.apiUrl}/order/admin?state=${state}`
    );
  }

  getOrderById(id: string): Observable<IResponse<IOrder>> {
    return this.http.get<IResponse<IOrder>>(`${this.apiUrl}/order/admin/${id}`);
  }
  patchOrder(id: string, condition: number): Observable<IResponse> {
    return this.http
      .patch<IResponse>(
        `${this.apiUrl}/order/admin/${id}`,
        {condition}
      )
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
