import { BookService } from '@frontend/product';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { IBook } from 'interfaces';
import { WishlistService } from '@frontend/order';

@Component({
  selector: 'robinbook-books-list',
  templateUrl: './books-list.component.html',
})
export class BooksListComponent implements OnInit {
  books: IBook[] = [];
  wishlistBooks: string[] = [];

  constructor(
    private bookService: BookService,
    private wishlistService: WishlistService,
    
    ) {}

  ngOnInit(): void {
    this.wishlistBooks = this.wishlistService.getWishlist().books

    this.bookService
      .getBooks()
      .pipe(take(1))
      .subscribe((response) => {
        this.books = response.result ? response.result : [];
      });
  }
  isFavorite(id:string): boolean{
    if(this.wishlistBooks.includes(id)){
      return true
    }
    return false
  }
}
