import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { IBook ,  IResponse} from 'interfaces';
import { catchError, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  apiUrl = environment.apiUrl
  constructor(private http: HttpClient) {}

  getBooks(state = ''): Observable<IResponse<IBook[]>> {
    return this.http.get<IResponse<IBook[]>>(
      `${this.apiUrl}/book?state=${state}`
    );
  }
  getBookCount(): Observable<IResponse<number>> {
    return this.http.get<IResponse<number>>(
      `${this.apiUrl}/book/admin/count`
    );
  }
  getBookById(id: string): Observable<IResponse<IBook>> {
    return this.http.get<IResponse<IBook>>(
      `${this.apiUrl}/book/admin/${id}`
    );
  }
  postBook(book: FormData): Observable<IResponse> {
    return this.http
      .post<IResponse>(
        `${this.apiUrl}/book`,
        book
      )
      .pipe(catchError((err) => of(err.error as IResponse)));
  }
  putBook(
    id: string,
    book: FormData
  ): Observable<IResponse> {
    return this.http
      .put<IResponse>(
        `${this.apiUrl}/book/${id}`,
        book
      )
      .pipe(catchError((err) => of(err.error as IResponse)));
  }
  deleteBook(id: string): Observable<IResponse> {
    return this.http
      .delete<IResponse>(
        `${this.apiUrl}/book/${id}`
      )
      .pipe(catchError((err) => of(err.error as IResponse)));
  }
}
