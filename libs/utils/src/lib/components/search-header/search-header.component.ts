import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IItem } from 'interfaces';

@Component({
  selector: 'frontend-search-header',
  templateUrl: './search-header.component.html'
})
export class SearchHeaderComponent implements OnInit {


  constructor( private store: Store) { }
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
