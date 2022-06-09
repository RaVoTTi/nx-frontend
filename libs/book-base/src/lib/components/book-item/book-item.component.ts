import { environment } from '@env/environment';
import { IBook } from 'interfaces';
import { Component, Input, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'frontend-book-item',
  templateUrl: './book-item.component.html'
})
export class BookItemComponent implements OnInit {
  rawUrl = environment.rawUrl
  @Input() book! : IBook;
  @Input() isFavorite! : boolean;


  items: MenuItem[] = [];

  constructor( private wishlistService:WishlistService ,private messageService: MessageService) { }

    ngOnInit(): void {
      this.items = [
        {label: 'Update', icon: 'pi pi-refresh', command: () => {
            console.log('asdasdsa');
        },},
        {label: 'Delete', icon: 'pi pi-times', command: () => {
            console.log('asdasdsa');
        },},
        {label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'},
    
    ];
    }

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
