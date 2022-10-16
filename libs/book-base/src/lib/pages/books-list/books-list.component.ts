import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { IBook } from 'interfaces';
import { BookBaseService } from '../../services/book-base.service';
import { WishlistService } from '../../services/wishlist.service';



@Component({
  selector: 'robinbook-books-list',
  templateUrl: './books-list.component.html',
})
export class BooksListComponent implements OnInit {
  books!: IBook[]| undefined;
  wishlistBooks: string[] = [];

  constructor(
    private bookBaseService: BookBaseService,
    private wishlistService: WishlistService,
    
    ) {}

  ngOnInit(): void {
    this.wishlistBooks = this.wishlistService.getWishlist().books

    this.bookBaseService
      .getBooks()
      .pipe(take(1))
      .subscribe((response) => {
        this.books = response.result;
      });
  }
  isFavorite(id:string): boolean{
    if(this.wishlistBooks.includes(id)){
      return true
    }
    return false
  }
}
