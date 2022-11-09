import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { IBook } from '@frontend/utils';
import { IResponse } from '@frontend/utils';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookBaseService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}
  getBooks(): Observable<IResponse<IBook[]>> {
    return this.http.get<IResponse<IBook[]>>(
      `${this.API_URL}/book`
    );
  }
  getBookBaseById(id: string): Observable<IResponse<IBook>> {
    return this.http.get<IResponse<IBook>>(`${this.API_URL}/book/${id}`);
  }
}
