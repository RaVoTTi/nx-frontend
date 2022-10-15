import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthBaseService } from '@frontend/auth-base';
// import { AuthBaseService, AuthState , authSelector } from '@frontend/auth-base';
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
  // isAuth$ = this.store.select(authSelector.selectIsAuth)

  constructor(
    private authBaseService: AuthBaseService,
    private store: Store
  ) {}

  ngOnInit(): void {

  }

  // ngOnDestroy() {
  //   this.unsubscribe$.next();
  //   this.unsubscribe$.complete();
  // }
}
