import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState } from './books.reducer';

import * as fromBooks from './books.reducer';

export const selectBooksState = createFeatureSelector<BooksState>('books');

export const selectAllBooks = createSelector(
  selectBooksState,
  fromBooks.selectAll
);

export const selectSearchBooks = ( word : string) => createSelector(
  selectAllBooks,
  books => books.filter(book => book.name.search(word))
);

export const selectLiteratureBooks =  createSelector(
  selectAllBooks,
  (books, ) => books.filter(book => book.subject.name == 'LITERATURE')
);
export const areBooksLoaded = createSelector(
  selectBooksState,
  state => state.allBooksLoaded
)