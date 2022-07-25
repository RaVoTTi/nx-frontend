import { environment } from '@env/environment';
import { IBook } from 'interfaces';
import { BookBaseService, WishlistService } from '@frontend/book-base';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthState , authSelector} from '@frontend/auth';
import { Store } from '@ngrx/store';


@Component({
  selector: 'robinbook-book-view',
  templateUrl: './book-view.component.html',
})
export class BookViewComponent implements OnInit {
  RAW_URL = environment.RAW_URL
  book!: IBook;
  bookId!: string;
  isAuth$ = this.store.select(authSelector.selectIsAuth)

  constructor(
    private bookBaseService: BookBaseService,
    private wishlistService:WishlistService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private store: Store<AuthState>

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

      this.router.navigate([`app/order/placeorder/${this.bookId}`]);
    }else{
      this.router.navigate([`auth/login`]);

    }


  }
}
