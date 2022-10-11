import { Component, OnInit } from '@angular/core';
import { BookBaseService, WishlistService } from '@frontend/book-base';
import { IBook } from 'interfaces';
import { take } from 'rxjs';

@Component({
  selector: 'robinbook-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  books!: IBook[] | undefined;
  wishlistBooks: string[] = [];
  constructor(
    private bookBaseService: BookBaseService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.wishlistBooks = this.wishlistService.getWishlist().books;

    this.bookBaseService
      .getBooks()
      .pipe(take(1))
      .subscribe((response) => {
        this.books = response.result;
      });
  }

  isFavorite(id: string): boolean {
    if (this.wishlistBooks.includes(id)) {
      return true;
    }
    return false;
  }
}
