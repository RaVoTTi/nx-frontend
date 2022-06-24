import { createReducer, on, Action } from '@ngrx/store';
import { IUser } from 'interfaces';
import { loginFailure, loginSuccess, logout , verifySuccess } from './auth.actions';

export interface AuthState {
  token: string | null;
  isAuth: boolean | null;
  error?: string;
//   isLoginInProgress: boolean
}

export const initialAuthState: AuthState = {
  token: null,
  isAuth: null,
};

const _authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (state, { isAuth, token }) => {
    return { ...state, isAuth, token };
  }),
  on(verifySuccess, (state, { isAuth, token }) => {
    return { ...state, isAuth, token };
  }),
  on(loginFailure, (state, { error }) => {
    return {
      ...state,
      error,
      isAuth: false,
      token: null,
    };
  }),
  on(logout, (state) => {
    return {
      ...state,
      isAuth: false,
      token: null,
    };
  })
);

export function authReducer(state: AuthState, action: Action) {
  return _authReducer(state, action);
}
