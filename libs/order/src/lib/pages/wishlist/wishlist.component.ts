import { BookService } from '@frontend/product';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { IBook } from 'interfaces';
import { WishlistService } from '../../services/wishlist.service';
import { Location } from '@angular/common';


@Component({
  selector: 'frontend-wishlist',
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent implements OnInit {
  books: IBook[] = [];
  wishlistBooks: IBook[] = [];

  constructor(
    private bookService: BookService,
    private location: Location,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this._getWishlist();
  }
  _getWishlist() {
    this.wishlistService.wishlist$.pipe(take(1)).subscribe((respWishlist) => {
      respWishlist.books.forEach((bookId) => {
        this.bookService
          .getBookByIdUser(bookId)
          .pipe(take(1))
          .subscribe(({ result }) => {
            if (result) {
              this.wishlistBooks.push(result);
            }
          });
      });
    });
  }
  back(){
    this.location.back()
  }
}
