import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { exampleIUser, IUser } from 'interfaces';

import * as AuthsActions from './auths.actions';
import { AuthsEntity } from './auths.models';

export const AUTHS_FEATURE_KEY = 'auths';
export interface AuthsState {
  user: IUser | undefined | null;
  isAuthenticated: boolean;
}

export interface AuthsPartialState {
  readonly [AUTHS_FEATURE_KEY]: AuthsState;
}

export const initialAuthsState: AuthsState = {
  user: null,
  isAuthenticated: false,
};

const authsReducer = createReducer(
  initialAuthsState,
  on(AuthsActions.buildAuthSession, (state) => ({ ...state })),
  on(AuthsActions.buildAuthSessionSuccess, (state, action) => ({
    ...state,
    user: action.user,
    isAuthenticated: true,
  })),
  on(AuthsActions.buildAuthSessionFailed, (state) => ({
    ...state,
    user: null,
    isAuthenticated: false,
  }))
);

export function reducer(state: AuthsState | undefined, action: Action) {
  return authsReducer(state, action);
}
