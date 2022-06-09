import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { IBook } from 'interfaces';
import { IResponse } from 'interfaces/IResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookBaseService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getBooks(): Observable<IResponse<IBook[]>> {
    return this.http.get<IResponse<IBook[]>>(
      `${this.apiUrl}/book`
    );
  }
  getBookBaseById(id: string): Observable<IResponse<IBook>> {
    return this.http.get<IResponse<IBook>>(`${this.apiUrl}/book/${id}`);
  }
}
