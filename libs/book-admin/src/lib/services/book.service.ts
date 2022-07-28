import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { IBook ,  IResponse} from 'interfaces';
import { catchError, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class BookService {
  API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}

  getBooks(state = ''): Observable<IResponse<IBook[]>> {
    return this.http.get<IResponse<IBook[]>>(
      `${this.API_URL}/book?state=${state}`
    );
  }
  getBookCount(): Observable<IResponse<number>> {
    return this.http.get<IResponse<number>>(`${this.API_URL}/book/admin/count`);
  }

  getBookByIdAdmin(id: string): Observable<IResponse<IBook>> {
    return this.http.get<IResponse<IBook>>(`${this.API_URL}/book/admin/${id}`);
  }
  postBook(book: FormData): Observable<IResponse> {
    return this.http
      .post<IResponse>(`${this.API_URL}/book`, book)
      .pipe(catchError((err) => of(err.error as IResponse)));
  }
  putBook(id: string, book: FormData): Observable<IResponse> {
    return this.http
      .put<IResponse>(`${this.API_URL}/book/${id}`, book)
      .pipe(catchError((err) => of(err.error as IResponse)));
  }
  deleteBook(id: string): Observable<IResponse> {
    return this.http
      .delete<IResponse>(`${this.API_URL}/book/${id}`)
      .pipe(catchError((err) => of(err.error as IResponse)));
  }
}
