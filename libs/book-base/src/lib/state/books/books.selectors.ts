import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState } from './books.reducer';

import * as fromBooks from './books.reducer';
import { map } from 'rxjs';
import { IItem } from 'interfaces';

export const selectBooksState = createFeatureSelector<BooksState>('books');

export const selectAllBooks = createSelector(
  selectBooksState,
  fromBooks.selectAll
);
export const selectAllBooksAsItems = createSelector(
  selectAllBooks,
  (books) =>
    books.map((book) => {
      return {
        label: book.name,
        icon: '📗',
        url: `/app/books/id/${book._id}`
      };
    }) as IItem[]
);

export const selectSearchBooks = (word: string) =>
  createSelector(selectAllBooks, (books) => {});

export const selectLiteratureBooks = createSelector(selectAllBooks, (books) =>
  books.filter((book) => book.subject.name === 'LITERATURE')
);
export const selectWishBooks = (wish: string[]) =>
  createSelector(selectAllBooks, (books) =>
    books.filter((book) => wish.includes(book._id))
  );
export const areBooksLoaded = createSelector(
  selectBooksState,
  (state) => state.allBooksLoaded
);
