import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthActions,
  AuthBaseService,
  LocalStorageService,
} from '@frontend/auth-base';
import { Store } from '@ngrx/store';
import { AppState } from './reducers';

@Component({
  selector: 'robinbook-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private authBaseService: AuthBaseService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    const token = this.localStorageService.getToken();

    if (token) {
      this.store.dispatch(AuthActions.login({ token }));
    }
  }
}
