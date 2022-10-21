import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, finalize, first, map, Observable, of, tap } from 'rxjs';
import { loadAllBooks } from '../state/books.actions';
import { areBooksLoaded } from '../state/books.selectors';

@Injectable()
export class BooksResolver implements Resolve<boolean> {
  loading = false;
  constructor(private store: Store) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {


    return this.store.pipe(
      select(areBooksLoaded),
      tap((booksLoaded) => {
        if (!this.loading && !booksLoaded ) {
          this.loading = true;
          this.store.dispatch(loadAllBooks());
        }
      }),
      filter(booksLoaded => booksLoaded),
      first(),
      finalize(()=> this.loading = false)
    );
  }
}
