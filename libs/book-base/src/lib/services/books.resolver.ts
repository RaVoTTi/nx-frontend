import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { finalize, first, map, Observable, of, tap } from 'rxjs';
import { loadAllBooks } from '../state/books.actions';
import { BookBaseService } from './book-base.service';

@Injectable()
export class BooksResolver implements Resolve<boolean> {
  loading = false;
  constructor(private store: Store) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    // return this.booksService.getBooks().pipe(
    //   map(books => !!books)
    // )

    return this.store.pipe(
      tap(() => {
        if (!this.loading) {
          this.loading = true;
          this.store.dispatch(loadAllBooks());
        }
      }),
      first(),
      finalize(()=> this.loading =false)
    );
  }
}
