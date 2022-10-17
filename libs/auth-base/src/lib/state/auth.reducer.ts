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
import { login, logout } from './auth.actions';

export interface AuthState {
  token: string | undefined;
  
}
export const initialAuthState: AuthState = {
  token: undefined,
};

export const authReducer = createReducer(
  initialAuthState,
  on(login, (state, action) => {
    return {
      token: action.token,
    };
  }),
  on(logout, (state, action) => {
    return {
      token: undefined,
    };
  }),

);
