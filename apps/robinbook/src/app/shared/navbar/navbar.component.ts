import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'robinbook-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(private router: Router, private messageService: MessageService) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'MyOrdering',
        styleClass: 'menu',
        routerLink: 'app/order/myordering',
        icon: 'pi pi-shopping-cart',
        command: () => {
          console.log('asdasdsa');
        },
      },
      {
        label: 'MyRefunding',
        styleClass: 'menu',
        routerLink: 'app/order/myrefunding',
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
          console.log('asdasdsa');
        },
      },
    ];
  }

  toLogin() {
    this.router.navigate(['/login']);
  }
}
