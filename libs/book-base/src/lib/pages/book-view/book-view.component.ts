/* eslint-disable @angular-eslint/component-selector */
import { environment } from '@env/environment';
import { IBook } from 'interfaces';
import { Component, OnInit } from '@angular/core';
import { of, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BookBaseService } from '../../services/book-base.service';
import { WishlistService } from '../../services/wishlist.service';


@Component({
  selector: 'robinbook-book-view',
  templateUrl: './book-view.component.html',
})
export class BookViewComponent implements OnInit {
  RAW_URL = environment.RAW_URL
  book!: IBook;
  bookId!: string;
  // isAuth$ = this.store.select(authSelector.selectIsAuth)
  isAuth$ = of(false)

  constructor(
    private bookBaseService: BookBaseService,
    private wishlistService:WishlistService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    // private store: Store<AuthState>

  ) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params) => {
      if (params['id']) {
        this.bookId = params['id'];
        this.bookBaseService
          .getBookBaseById(this.bookId)
          .pipe(take(1))
          .subscribe(({ result }) => {
            if (result) {
              this.book = result;
            }
          });
      }
    });
  }

  back(){
    this.location.back()
  }
  addBookToWishlist(){
  
      this.wishlistService.setBookWishlist(this.bookId)
  }
  toCheckOut(){
    if(this.isAuth$){

      this.router.navigate([`/checkout/placeorder/${this.bookId}`]);
    }else{
      this.router.navigate([`/auth/login`]);

    }


  }
}
