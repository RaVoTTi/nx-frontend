import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as AuthsActions from './auths.actions';
import { AuthsEffects } from './auths.effects';

describe('AuthsEffects', () => {
  let actions: Observable<Action>;
  let effects: AuthsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        AuthsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(AuthsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: AuthsActions.init() });

      const expected = hot('-a-|', {
        a: AuthsActions.loadAuthsSuccess({ auths: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
