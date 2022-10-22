import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IItem } from 'interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'frontend-search-header',
  templateUrl: './search-header.component.html',
})
export class SearchHeaderComponent implements OnInit  {
  @Input() items!: Observable<IItem[]>;

  constructor(private store: Store, private router: Router) {}
  isDropdownOpened = false;
  
  
  ngOnInit(): void {
    this.items.subscribe(books => console.log(books))
  }

  toggleDropdown() {
    this.isDropdownOpened = !this.isDropdownOpened;
  }

  actionOutside() {
    this.isDropdownOpened = false;
  }
  click(url: string){
    this.router.navigate([url])

    
  }
}
