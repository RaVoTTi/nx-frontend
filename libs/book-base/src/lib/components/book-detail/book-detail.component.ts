import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { IBook } from '@frontend/utils';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'frontend-book-detail',
  templateUrl: './book-detail.component.html',
})
export class BookDetailComponent implements OnInit {
  RAW_URL = environment.RAW_URL;

  @Input() book!: IBook | undefined;
  wishlistBooks: string[] = [];
  isFavorite!: boolean;

  constructor(
    private router: Router,
    
    private wishlistService: WishlistService) {}

  ngOnInit() {
    this.wishlistBooks = this.wishlistService.getWishlist().books;
    if(this.book){

      this.isFavorite = this.wishlistBooks.includes(this.book._id)
    }
  }
  toCheckOut() {
    if(this.book){

    this.router.navigateByUrl(`checkout/placeorder/${this.book._id}`);
    }
  }
  addBookToWishlist() {
    if(this.book){

    if (this.isFavorite === false) {
      this.isFavorite = true;
      this.wishlistService.setBookWishlist(this.book._id);
    } else {
      this.isFavorite = false;
      this.wishlistService.deleteBookWishlist(this.book._id);
    }
  }
}
}
