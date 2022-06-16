import { AuthsEntity } from './auths.models';
import { authsAdapter, AuthsPartialState, initialState } from './auths.reducer';
import * as AuthsSelectors from './auths.selectors';

describe('Auths Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getAuthsId = (it: AuthsEntity) => it.id;
  const createAuthsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as AuthsEntity);

  let state: AuthsPartialState;

  beforeEach(() => {
    state = {
      auths: authsAdapter.setAll(
        [
          createAuthsEntity('PRODUCT-AAA'),
          createAuthsEntity('PRODUCT-BBB'),
          createAuthsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Auths Selectors', () => {
    it('getAllAuths() should return the list of Auths', () => {
      const results = AuthsSelectors.getAllAuths(state);
      const selId = getAuthsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = AuthsSelectors.getSelected(state) as AuthsEntity;
      const selId = getAuthsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getAuthsLoaded() should return the current "loaded" status', () => {
      const result = AuthsSelectors.getAuthsLoaded(state);

      expect(result).toBe(true);
    });

    it('getAuthsError() should return the current "error" state', () => {
      const result = AuthsSelectors.getAuthsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
