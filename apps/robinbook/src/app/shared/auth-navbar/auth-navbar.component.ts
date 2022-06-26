import { Component, OnInit } from '@angular/core';
import { AuthService, LocalStorageService } from '@frontend/auth';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'robinbook-auth-navbar',
  templateUrl: './auth-navbar.component.html'
})
export class AuthNavbarComponent implements OnInit {
  items: MenuItem[] = [];


  constructor(

    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.items = [

      {
        label: 'MyOrdering',
        styleClass: 'menu',
        routerLink: 'order/myordering',
        icon: 'pi pi-money-bill',
        command: () => {
          console.log('asdasdsa');
        },
      },
      {
        label: 'MySupport',
        styleClass: 'menu',

        icon: 'pi pi-phone',
        command: () => {
          console.log('asdasdsa');
        },
      },
      {
        label: 'MySettings',
        styleClass: 'menu',
        icon: 'pi pi-cog',
        command: () => {
          console.log('asdasdsa');
        },
      },
      {
        styleClass: 'menu-separator',
        disabled: true,
      },
      {
        label: 'Log Out',
        styleClass: 'menu',
        icon: 'pi pi-power-off',

        command: () => {
          this.authService.logout('/app/home')
        },
      },
    ];
  }
  }


