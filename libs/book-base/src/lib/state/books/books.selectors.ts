import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState } from './books.reducer';

import * as fromBooks from './books.reducer';
import { map } from 'rxjs';
import { IItem } from 'interfaces';
import { Router } from '@angular/router';

export const selectBooksState = createFeatureSelector<BooksState>('books');

export const selectAllBooks = createSelector(
  selectBooksState,
  fromBooks.selectAll
);
export const selectBooksEntities = createSelector(
  selectBooksState,
  fromBooks.selectEntities 
);
export const selectBooksById = (id: string) =>
  createSelector(selectBooksEntities, (books) =>
    books[id]
  );
export const selectAllBooksAsItems = (router:Router) => createSelector(
  selectAllBooks,
  (books) =>
    books.map((book) => {
      return {
        label: book.name,
        icon: '📕',
        callback: router.navigateByUrl('/app/books/id/' + book._id),
      };
    }) as IItem[]
);
export const selectSearchItems = (router:Router ,word: string | null) =>
  createSelector(selectAllBooksAsItems(router), (books) => {
    if (word && word.length > 0) {
      const wordUpper = word.toLowerCase();
      const search = books.filter(({ label }) => {
        return label.includes(wordUpper);
      });
      if (search.length > 0) {
        return search;
      }
      return [
        {
          label: 'Book not found',
          icon: '❌',
          callback: () => {
            console.log('Book not found')
          },

        },
      ];
    } else {
      return books.slice(0, 4);
    }
  });

export const selectSearchBooks = (word: string) =>
  createSelector(selectAllBooks, (books) =>
    books.filter(({ name }) => name.search(new RegExp(word)) > 0)
  );

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
