import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LocalStorageService } from '@frontend/auth-base';
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
      onClick: () => {
        this.router.navigate(["/app/wishlist"]);
      },
    },
  ];

  primary: IItem[] = [
    {
      label: 'Books',
      icon: '📚',
      onClick: () => {
        this.router.navigate(['/app/books']);
      },
    },
    {
      label: 'Learning',
      icon: '📝',
      onClick: () => {
        this.router.navigate(['/app/order/mylearning']);
      },
    },
  ];
  secondary: IItem[] = [
    {
      label: 'Orders',
      icon: '💵',
      onClick: () => {
        this.router.navigate(['/app/order/myordering']);
      },
    },
    {
      label: 'Support',
      // routerLink: 'order/myordering',
      icon: '📞',
      onClick: () => {
        this.router.navigate(['/app/support']);
      },
    },
    {
      label: 'Settings',
      icon: '🧰',
      onClick: () => {
        this.router.navigate(['/app/settings']);
      },
    },
    {
      
      label: 'Log Out',
      icon: '🚪',
      onClick: () => {
        this.authService.logout('/app/home');
      },
    },
  ];
  screenWidth: any;

  isDropdownOpened = false;

  constructor(
    private router: Router,

    private authService: AuthService
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
