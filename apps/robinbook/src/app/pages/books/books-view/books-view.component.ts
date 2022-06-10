import { environment } from '@env/environment';
import { IBook } from 'interfaces';
import { BookBaseService, WishlistService } from '@frontend/book-base';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'robinbook-books-view',
  templateUrl: './books-view.component.html',
})
export class BooksViewComponent implements OnInit {
  rawUrl = environment.rawUrl
  book!: IBook;
  bookId!: string;
  constructor(
    private bookBaseService: BookBaseService,
    private wishlistService:WishlistService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
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
          this.router.navigate(['app/order/checkout']);

  }
}
