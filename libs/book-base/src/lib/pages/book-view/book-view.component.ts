/* eslint-disable @angular-eslint/component-selector */
import { environment } from '@env/environment';
import { IBook } from 'interfaces';
import { Component, OnInit } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BookBaseService } from '../../services/book-base.service';
import { WishlistService } from '../../services/wishlist.service';
import { select, Store } from '@ngrx/store';
import { selectBooksById } from '../../state/books/books.selectors';

@Component({
  selector: 'robinbook-book-view',
  templateUrl: './book-view.component.html',
})
export class BookViewComponent implements OnInit {
  bookId!: string;

  constructor(
    private bookBaseService: BookBaseService,
    private wishlistService: WishlistService,
    private route: ActivatedRoute,
    private location: Location,
    private store: Store,
    
  )
  {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params) => {
      if (params['id']) {
        this.bookId = params['id'];


        // this.bookBaseService
        //   .getBookBaseById(this.bookId)
        //   .pipe(take(1))
        //   .subscribe(({ result }) => {
        //     if (result) {
        //       this.book = result;
        //     }
        //   });
      }
    });
  }
  // reload(){

  // }

  back() {
    this.location.back();
  }
  addBookToWishlist() {
    this.wishlistService.setBookWishlist(this.bookId);
  }
  book(): IBook | undefined {
    let data: IBook | undefined;
    this.store
      .pipe(select(selectBooksById(this.bookId)), take(1))
      .subscribe((book) => (data = book));

    return data;
  }
}
