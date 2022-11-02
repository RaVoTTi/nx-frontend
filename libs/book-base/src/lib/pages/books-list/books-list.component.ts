import { Component, OnInit } from '@angular/core';
import { Observable, of, take, takeLast } from 'rxjs';
import { IBook, IItem } from 'interfaces';
import { BookBaseService } from '../../services/book-base.service';
import { WishlistService } from '../../services/wishlist.service';
import { select, Store } from '@ngrx/store';
import { selectAllBooks, selectAllBooksAsItems } from '../../state/books/books.selectors';
import { Router } from '@angular/router';



@Component({
  selector: 'robinbook-books-list',
  templateUrl: './books-list.component.html',
})
export class BooksListComponent implements OnInit {
  allBooks$!: Observable<IBook[]>;
  allItems$!: Observable<IItem[]> ;
  
  wishlistBooks: string[] = [];

  constructor(
    private store: Store,
    private router: Router,

    private wishlistService: WishlistService,
    
    ) {}

  ngOnInit(): void {
    this.wishlistBooks = this.wishlistService.getWishlist().books
    this.reload()
  }
  reload(){
    this.allBooks$ = this.store.pipe(select(selectAllBooks))
    this.allItems$ = this.store.pipe(select(selectAllBooksAsItems(this.router)))
  }
  isFavorite(id:string): boolean{
    if(this.wishlistBooks.includes(id)){
      return true
    }
    return false
  }
}
