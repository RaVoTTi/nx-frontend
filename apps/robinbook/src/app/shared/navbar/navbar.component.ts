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
      label: 'Wishlist',
      icon: '💚',
      url: "/app/books/wishlist"
      },
    
  ];
  login: IItem[] = [
    {
      label: 'Login',
      icon: '🤓',
      url: '/auth/login'
      },
    
  ];
  signUp: IItem[] = [
    {
      label: 'Sign Up',
      icon: '📝',
      url: '/auth/signup'
      },
    
  ];

  primary: IItem[] = [
    {
      label: 'Books',
      icon: '📚',
      url: '/app/books/list'
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
