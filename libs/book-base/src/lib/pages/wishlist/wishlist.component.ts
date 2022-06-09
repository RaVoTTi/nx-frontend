import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { IBook } from 'interfaces';
import { Location } from '@angular/common';
import { BookBaseService } from '../../services/book-base.service';
import { WishlistService } from '../../services/wishlist.service';


@Component({
  selector: 'frontend-wishlist',
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent implements OnInit {
  wishlistBooks: IBook[] = [];

  constructor(
    private bookBaseService: BookBaseService,
    private location: Location,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this._getWishlist();
  }
  _getWishlist() {
    this.wishlistService.wishlist$.pipe(take(1)).subscribe((respWishlist) => {
      respWishlist.books.forEach((bookId: string) => {
        this.bookBaseService
          .getBookBaseById(bookId)
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
