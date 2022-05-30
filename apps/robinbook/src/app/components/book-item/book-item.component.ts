import { environment } from '@env/environment';
import { IBook } from 'interfaces';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'robinbook-book-item',
  templateUrl: './book-item.component.html'
})
export class BookItemComponent  {
  rawUrl = environment.rawUrl
  @Input() book! : IBook;

  constructor() { }



}
