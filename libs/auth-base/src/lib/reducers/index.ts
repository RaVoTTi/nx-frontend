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
import { IAuth } from '../interfaces/IAuth';

export interface AuthState {
  user: IAuth | undefined;
}
export const initialAuthState: AuthState = {
  user: undefined,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthAction.login, (state, action) => {
    return {
      user: action.user,
    };
  }),
  
);
