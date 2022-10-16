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
import { AuthAction } from '../actions/action-type';

export interface AuthState {
  token: string | undefined;
  
}
export const initialAuthState: AuthState = {
  token: undefined,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthAction.login, (state, action) => {
    return {
      token: action.token,
    };
  }),
  on(AuthAction.logout, (state, action) => {
    return {
      token: undefined,
    };
  }),

);
