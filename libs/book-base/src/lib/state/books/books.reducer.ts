import { state } from '@angular/animations';
import { initialAuthState } from '@frontend/auth-base';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
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
import { allBooksLoaded } from './books.actions';
// import { login, logout } from './book.actions';

export interface BooksState extends EntityState<IBook> {
  allBooksLoaded: boolean;
}



export const adapter = createEntityAdapter<IBook>({
  selectId: book => book._id
});

export const initialBooksState = adapter.getInitialState({
  
});

export const booksReducer = createReducer(
  initialBooksState,

  on(allBooksLoaded, (state, action) => adapter.setAll(action.books, {...state, allBooksLoaded:true}))
 
);

export const {
selectAll,
selectEntities,
selectIds,
selectTotal

} = adapter.getSelectors()