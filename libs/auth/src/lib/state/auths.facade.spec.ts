import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as AuthsActions from './auths.actions';
import { AuthsEffects } from './auths.effects';
import { AuthsFacade } from './auths.facade';
import { AuthsEntity } from './auths.models';
import {
  AUTHS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './auths.reducer';
import * as AuthsSelectors from './auths.selectors';

interface TestSchema {
  auths: State;
}

describe('AuthsFacade', () => {
  let facade: AuthsFacade;
  let store: Store<TestSchema>;
  const createAuthsEntity = (id: string, name = ''): AuthsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(AUTHS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([AuthsEffects]),
        ],
        providers: [AuthsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(AuthsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allAuths$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allAuths$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadAuthsSuccess` to manually update list
     */
    it('allAuths$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allAuths$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        AuthsActions.loadAuthsSuccess({
          auths: [createAuthsEntity('AAA'), createAuthsEntity('BBB')],
        })
      );

      list = await readFirst(facade.allAuths$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
