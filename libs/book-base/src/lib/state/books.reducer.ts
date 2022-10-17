import { state } from '@angular/animations';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import { IBook } from 'interfaces';
// import { login, logout } from './book.actions';

export interface BooksState {
  list: IBook[] | undefined
}
export const initialBooksState: BooksState = {
  list: undefined,
};

export const booksReducer = createReducer(

  initialBooksState,


  // on(login, (state, action) => {
  //   return {
  //     token: action.token,
  //   };
  // }),
  // on(logout, (state, action) => {
  //   return {
  //     token: undefined,
  //   };
  // }),

);
