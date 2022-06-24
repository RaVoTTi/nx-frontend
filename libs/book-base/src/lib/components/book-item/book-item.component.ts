import { environment } from '@env/environment';
import { IBook } from 'interfaces';
import { Component, Input } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'frontend-book-item',
  templateUrl: './book-item.component.html'
})
export class BookItemComponent {
  rawUrl = environment.rawUrl
  @Input() book! : IBook;
  @Input() isFavorite! : boolean;


  items: MenuItem[] = [];

  constructor( private wishlistService:WishlistService ,private messageService: MessageService) { }


addBookToWishlist(){
  if( this.isFavorite === false){

    this.isFavorite = true
    this.wishlistService.setBookWishlist(this.book._id)
  }
  else{

    this.isFavorite = false
      this.wishlistService.deleteBookWishlist(this.book._id)
  }
}



}
