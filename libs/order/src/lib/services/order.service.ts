import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import { IResponse, IOrder, ICheckout } from 'interfaces/index';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  API_URL = environment.API_URL;
  
  constructor(private http: HttpClient) {}
  

  // USER
  getMyOrders(condition: number): Observable<IResponse<IOrder[]>> {
    return this.http.get<IResponse<IOrder[]>>(
      `${this.API_URL}/order/user?condition=${condition}`, 
    );
  }
  getContentById(id: string): Observable<IResponse<IOrder>> {
    return this.http.get<IResponse<IOrder>>(
      `${this.API_URL}/order/content/${id}`
    )
  }
  postMyOrder(id: string): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${this.API_URL}/order/checkout/${id}`,
      {}
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

  // ADMIN
  getOrders(state = ''): Observable<IResponse<IOrder[]>> {
    return this.http.get<IResponse<IOrder[]>>(
      `${this.API_URL}/order/admin?state=${state}`
    );
  }
  getOrderCount(): Observable<IResponse<number>> {
    return this.http.get<IResponse<number>>(
      `${this.API_URL}/order/admin/count`
    );
  }
  getOrderIncome(): Observable<IResponse<number>> {
    return this.http.get<IResponse<number>>(
      `${this.API_URL}/order/admin/income`
    );
  }
  getOrderById(id: string): Observable<IResponse<IOrder>> {
    return this.http.get<IResponse<IOrder>>(
      `${this.API_URL}/order/admin/${id}`
    );
  }
  patchOrder(id: string, condition: number): Observable<IResponse> {
    return this.http
      .patch<IResponse>(`${this.API_URL}/order/admin/${id}`, { condition })
  }
  deleteOrder(id: string): Observable<IResponse> {
    return this.http
      .delete<IResponse>(`${this.API_URL}/order/admin/${id}`)
  }
}
