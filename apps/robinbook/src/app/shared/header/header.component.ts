import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthBaseService, authSelectors, LocalStorageService } from '@frontend/auth-base';
// import { AuthBaseService, AuthState , authSelector } from '@frontend/auth-base';
import { select, Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { map, Observable, of, Subject, take, takeUntil } from 'rxjs';
import { AppState } from '../../reducers';

@Component({
  selector: 'robinbook-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  items!: MenuItem[];
  
  isLoggedIn$!: Observable<boolean>;
  isLoggedOut$!: Observable<boolean>;
  
  // isAuth$ = this.store.select(authSelector.selectIsAuth)

  constructor(
    private localStorageService : LocalStorageService,
    private store: Store<AppState>) {}

  ngOnInit(): void {

    this.isLoggedIn$ = this.store.pipe(
      select(authSelectors.isLoggedIn)
    )
    this.isLoggedOut$ = this.store.pipe(
      select(authSelectors.isLoggedOut)
    )
  }



}
