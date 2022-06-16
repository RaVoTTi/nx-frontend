import { createAction, props } from '@ngrx/store';
import { IUser } from 'interfaces';
import { AuthsEntity } from './auths.models';


export const buildAuthSession = createAction( '[Auths] Build Auth Session')


export const buildAuthSessionSuccess = createAction(
  '[Auths/API] Build Auth Session Success',
  props<{ user: IUser | undefined }>()
);

export const buildAuthSessionFailed = createAction(
  '[Auths/API] Build Auth Session Failed');
