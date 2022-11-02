import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
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
import { selectAllBooksAsItems, selectSearchItems } from '../../state/books/books.selectors';

@Component({
  selector: 'frontend-search-header',
  templateUrl: './search-header.component.html',
})
export class SearchHeaderComponent implements OnInit {
  items$!: Observable<IItem[]>;
  src!: string;

  // @Output() public enter = new EventEmitter();
  query = new FormControl('');
  books$! : Observable<IItem[]>
  isDropdownOpened = false;

  constructor(private router: Router,
    private store: Store) {
    this.query.valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged()
    ).subscribe(word =>{
     return this.items$ = this.store.pipe(select(selectSearchItems(this.router, word)))}

  
    )
  }
  ngOnInit()  {
  }
  // search( value : string){
  //   this.items$ = this.store.pipe(select(selectSearchItems(value)))
  //   // console.log(value)
  // }

  toggleDropdown() {
    this.isDropdownOpened = !this.isDropdownOpened;
  }

  actionOutside() {
    this.isDropdownOpened = false;
  }
  click(url: string) {
    this.router.navigate([url]);
  }

}
