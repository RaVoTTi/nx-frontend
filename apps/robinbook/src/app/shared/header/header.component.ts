import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'robinbook-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  items!: MenuItem[];
  constructor() {}

  ngOnInit() {
    this.items = [
      {label: 'Home', icon: 'pi pi-fw pi-home'},
      {label: 'Books', icon: 'pi pi-fw pi-book'},
      {label: 'My Learning', icon: 'pi pi-fw pi-pencil'},
      {label: 'My Account', icon: 'pi pi-fw pi-file'},
  ];
  }
}
