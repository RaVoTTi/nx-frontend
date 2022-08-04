import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState  } from './auth.reducer';

// // Lookup the 'Auths' feature state managed by NgRx
export const selectAuthsState = createFeatureSelector<AuthState>('auth');

export const selectToken = createSelector(selectAuthsState, (state) => state.token)

export const selectIsAuth = createSelector(selectAuthsState, (state) => state.isAuth)
