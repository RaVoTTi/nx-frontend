import { BookService } from '@frontend/product';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { IBook } from 'interfaces';

@Component({
  selector: 'robinbook-books-list',
  templateUrl: './books-list.component.html',
})
export class BooksListComponent implements OnInit {
  books: IBook[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService
      .getBooks()
      .pipe(take(1))
      .subscribe((response) => {
        this.books = response.result ? response.result : [];
      });
  }
}
