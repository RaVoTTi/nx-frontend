import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@frontend/auth';
import { MenuItem } from 'primeng/api';
import { of, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'robinbook-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  items!: MenuItem[];
  isAuthenticated!: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.observeIsAuthenticated().subscribe(auth =>{

      this.isAuthenticated = auth 
      console.log(auth)
    }
      );
  }

  // ngOnDestroy() {
  //   this.unsubscribe$.next();
  //   this.unsubscribe$.complete();
  // }
}
