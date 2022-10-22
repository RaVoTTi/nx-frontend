import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { IBook, IWishlist } from 'interfaces';
import { Location } from '@angular/common';
import { BookBaseService } from '../../services/book-base.service';
import { WishlistService } from '../../services/wishlist.service';
import { select, Store } from '@ngrx/store';
import { selectWishBooks } from '../../state/books/books.selectors';


@Component({
  selector: 'frontend-wishlist',
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent implements OnInit {
  wishBooks$!:Observable<IBook[]>
  wishIds$!:Observable<string[]>
  ids! : string[]

  constructor(
    private bookBaseService: BookBaseService,
    private wishlistService: WishlistService,
    private store: Store

  ) {}

  ngOnInit(): void {
    this._getWishlist();
    this.reload()
  }

  reload(){
    this.ids = this.wishlistService.getWishlist().books
    this.wishBooks$ = this.store.select(selectWishBooks(this.ids))


  }

  _getWishlist() {

    this.wishlistService.wishlist$.pipe(take(1)).subscribe((respWishlist) => {
      // this.wishlistLocal = respWishlist.books
      respWishlist.books.forEach((bookId: string) => {
        this.bookBaseService
          .getBookBaseById(bookId)
          .pipe(take(1))
          .subscribe(({ result }) => {
            if(result){

              // this.wishlistBooks.push(result);
            }
          });
      });
    });
  }

}
