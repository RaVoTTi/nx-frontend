import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as AuthsActions from './auths.actions';
import * as AuthsSelectors from './auths.selectors';

@Injectable()
export class AuthsFacade {


  currentUser$ = this.store.pipe(select(AuthsSelectors.getUser))
  isAuthenticated$ = this.store.pipe(select(AuthsSelectors.getIsAuthenticated))
  constructor(private readonly store: Store) {}

  buildAuthSession() {
    this.store.dispatch(AuthsActions.buildAuthSession());
  }
}
