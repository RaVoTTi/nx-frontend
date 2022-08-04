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
      label: 'MyWishlist',
      icon: 'pi pi-heart',
      onClick: () => {
        this.router.navigate(["/app/wishlist"]);
      },
    },
  ];

  primary: IItem[] = [
    {
      label: 'Books',
      icon: 'pi pi-book',
      onClick: () => {
        this.router.navigate(['/app/books']);
      },
    },
    {
      label: 'MyLearning',
      icon: 'pi pi-paperclip',
      onClick: () => {
        this.router.navigate(['/app/order/mylearning']);
      },
    },
  ];
  secondary: IItem[] = [
    {
      label: 'MyOrdering',
      icon: 'pi pi-money-bill',
      onClick: () => {
        this.router.navigate(['/app/order/myordering']);
      },
    },
    {
      label: 'MySupport',
      // routerLink: 'order/myordering',
      icon: 'pi pi-phone',
      onClick: () => {
        this.router.navigate(['/app/order/myordering']);
      },
    },
    {
      label: 'MySettings',
      icon: 'pi pi-cog',
      onClick: () => {
        console.log('asdasdsa');
      },
    },
    {
      label: 'Log Out',
      icon: 'pi pi-power-off',
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
