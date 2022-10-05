import { style } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { IItem } from 'interfaces';

@Component({
  selector: 'frontend-search-header',
  templateUrl: './search-header.component.html',
  styles: [
    `
      h2 {
        font-size: 2rem;
        color: white;
        
      }
    `,
  ],
})
export class SearchHeaderComponent implements OnInit {
  @Input() title = 'Robin Boook';

  constructor() {}
  isDropdownOpened = false;
  items: IItem[] = [
    {
      label: 'MyWishlist',
      icon: '📗',
      onClick: () => {
        console.log('juju');
      },
    },
  ];
  ngOnInit(): void {}

  toggleDropdown() {
    this.isDropdownOpened = !this.isDropdownOpened;
  }

  actionOutside() {
    this.isDropdownOpened = false;
  }
}
