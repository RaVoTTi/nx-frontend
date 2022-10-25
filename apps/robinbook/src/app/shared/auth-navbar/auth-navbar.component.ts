import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthActions, AuthBaseService, LocalStorageService } from '@frontend/auth-base';
import { Store } from '@ngrx/store';
import { IItem } from 'interfaces';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'robinbook-auth-navbar',
  templateUrl: './auth-navbar.component.html',
})
export class AuthNavbarComponent implements OnInit {
  whislist: IItem[] = [
    {
      label: 'Wishlist',
      icon: '💚',
      url: "/app/books/wishlist"
      },
    
  ];

  primary: IItem[] = [
    {
      label: 'Books',
      icon: '📚',
      url: '/app/books'
      },
    
    {
      label: 'My Learning',
      icon: '📝',
      url: '/app/mylearning'
      },
    
  ];
  secondary: IItem[] = [
    // {
    //   label: 'Orders',
    //   icon: '💵',
    //   url: '/app/order/myordering'
    //   },
    
    // {
    //   label: 'Support',
    //   // routerLink: 'order/myordering',
    //   icon: '📞',
    //   url: '/app/support'
    //   },
    
    {
      label: 'Settings',
      icon: '🧰',
      url: '/app/settings'
      },
    
    // {
      
    //   label: 'Log Out',
    //   icon: '🚪',
    //   function: () => {
    //     this.store.dispatch(AuthActions.logout())
    //   },
    // },
  ];
  screenWidth: any;

  isDropdownOpened = false;

  constructor(
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
  }

  getItems(): IItem[] {
    if (this.screenWidth < 500) {
      return this.primary.concat(this.whislist, this.secondary);
    } else if (this.screenWidth < 540) {
      return this.whislist.concat(this.secondary);
    }

    return this.secondary;
  }
  toggleDropdown(): void {
    this.isDropdownOpened = !this.isDropdownOpened;
  }
  clickedOutside(): void {
    this.isDropdownOpened = false;
  }
}
