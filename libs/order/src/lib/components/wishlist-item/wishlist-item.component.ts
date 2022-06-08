import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { IBook } from 'interfaces';
import { MenuItem } from 'primeng/api';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'frontend-wishlist-item',
  templateUrl: './wishlist-item.component.html',
})
export class WishlistItemComponent implements OnInit {
  rawUrl = environment.rawUrl;

  @Input() book!: IBook;
  items: MenuItem[] = [];
  isFavorite = true;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
          console.log('asdasdsa');
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {
          console.log('asdasdsa');
        },
      },
      { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
    ];
  }
  deleteBookToWishlist() {
    this.wishlistService.deleteBookWishlist(this.book._id);
    this.isFavorite = false
  }
}
