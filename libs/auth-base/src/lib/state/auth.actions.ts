import { createAction, props } from '@ngrx/store';
import { ILogin, IUser } from 'interfaces';

export const loginRequest = createAction(
  '[Auth] Login Request',
  props<{login:ILogin}>()
);
export const loginJWT = createAction(
  '[Auth] Login JWT',
);

export const logout = createAction(
  '[Auth] Logout'
);
export const verifySuccess = createAction(
  '[Auth] Verify Success',
  props<{isAuth:boolean, token: string}>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{isAuth:boolean, token: string}>()
);

export const loginFailure = createAction(
  '[Auth] Login Request',
  props<{error: string}>()
);
