import { Component, OnInit } from '@angular/core';
import { IItem } from 'interfaces';

@Component({
  selector: 'frontend-search-header',
  templateUrl: './search-header.component.html'
})
export class SearchHeaderComponent implements OnInit {

  constructor() { }
  isDropdownOpened = false;
  items : IItem[] = [
    {
      label: 'MyWishlist',
      icon: '📗',
      onClick: () => {
        console.log('juju')
      },
    },
  ]
  ngOnInit(): void {
  }

  toggleDropdown() {
    this.isDropdownOpened = !this.isDropdownOpened;
  }

  actionOutside() {
    this.isDropdownOpened = false;
  }
}
