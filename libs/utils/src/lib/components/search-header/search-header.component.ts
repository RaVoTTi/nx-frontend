import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { selectSearchItems } from '@frontend/book-base'; 
import { select, Store } from '@ngrx/store';
import { IItem } from 'interfaces';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  tap,
} from 'rxjs';
import { EventEmitter } from 'stream';

@Component({
  selector: 'frontend-search-header',
  templateUrl: './search-header.component.html',
})
export class SearchHeaderComponent implements OnInit {
  @Input() items$!: Observable<IItem[]>;
  @Input() placeholder!: string;
  // @Output() public enter = new EventEmitter();
  search = new FormControl('');
  books$! : Observable<IItem[]>
  isDropdownOpened = false;

  constructor(private router: Router, private store: Store) {
    this.search.valueChanges
      // .pipe(debounceTime(100), distinctUntilChanged())
      .subscribe((search) => {
        if(search){
          console.log(search)

          this.books$ = this.store.select(selectSearchItems(search))
        }
      });
  }
  ngOnInit(): void {

  }

  toggleDropdown() {
    this.isDropdownOpened = !this.isDropdownOpened;
  }

  actionOutside() {
    this.isDropdownOpened = false;
  }
  click(url: string) {
    this.router.navigate([url]);
  }
  onEnter() {
    console.log('Valen');
  }
}
