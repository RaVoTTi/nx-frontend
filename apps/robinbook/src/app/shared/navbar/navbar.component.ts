import { Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { IItem } from 'interfaces';

@Component({
  selector: 'robinbook-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  wishlist: IItem[] = [
    {
      label: 'MyWishlist',
      icon: 'pi pi-heart',
      onClick: () => {
        this.router.navigate(["/app/wishlist"]);
      },
    },
  ];
  login: IItem[] = [
    {
      label: 'Login',
      icon: 'pi pi-user',
      onClick: () => {
        this.router.navigate(['/auth/login']);
      },
    },
  ];
  signUp: IItem[] = [
    {
      label: 'Sign Up',
      icon: 'pi pi-user-plus',
      onClick: () => {
        this.router.navigate(['/auth/signup']);
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
  screenWidth: any;
  isDropdownOpened = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleDropdown() {
    this.isDropdownOpened = !this.isDropdownOpened;
  }

  clickedOutside() {
    this.isDropdownOpened = false;
  }

  getItems() {
    if (this.screenWidth < 450){
      return this.primary.concat(this.wishlist, this.login, this.signUp);

    }
    else if (this.screenWidth < 580) {
      return this.primary.concat(this.wishlist, this.login);
    } else if (this.screenWidth < 700) {
      return this.wishlist.concat(this.login);
    } else if (this.screenWidth < 768) {
      return this.wishlist;
    }
    return [];
  }

  toLogin() {
    this.router.navigate(['/login']);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
  }
}
