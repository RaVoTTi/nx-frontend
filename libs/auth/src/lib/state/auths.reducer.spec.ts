import { Action } from '@ngrx/store';

import * as AuthsActions from './auths.actions';
import { AuthsEntity } from './auths.models';
import { State, initialState, reducer } from './auths.reducer';

describe('Auths Reducer', () => {
  const createAuthsEntity = (id: string, name = ''): AuthsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Auths actions', () => {
    it('loadAuthsSuccess should return the list of known Auths', () => {
      const auths = [
        createAuthsEntity('PRODUCT-AAA'),
        createAuthsEntity('PRODUCT-zzz'),
      ];
      const action = AuthsActions.loadAuthsSuccess({ auths });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
