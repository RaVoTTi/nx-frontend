import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, AuthState , authSelector } from '@frontend/auth';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { of, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'robinbook-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  items!: MenuItem[];
  isAuthenticated!: boolean;
  isAuth$ = this.store.select(authSelector.selectIsAuth)

  constructor(
    private authService: AuthService,
    private store: Store<AuthState>
  ) {}

  ngOnInit(): void {

  }

  // ngOnDestroy() {
  //   this.unsubscribe$.next();
  //   this.unsubscribe$.complete();
  // }
}
