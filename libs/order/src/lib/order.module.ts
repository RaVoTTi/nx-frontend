import { WishlistService } from './services/wishlist.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
})
export class OrderModule {
  constructor(wishlistService:WishlistService) {
      wishlistService.initWishlistLocalStorage()
  }
}
