import { WishlistService } from './services/wishlist.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistIconComponent } from './components/wishlist-icon/wishlist-icon.component';
import {BadgeModule} from 'primeng/badge';
import { WishlistItemComponent } from './components/wishlist-item/wishlist-item.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    BadgeModule,
    RouterModule
  ],
  declarations: [
    WishlistIconComponent,
    WishlistItemComponent,
    WishlistComponent

  ],
  exports: [
    WishlistIconComponent
  ],
})
export class OrderModule {
  constructor(wishlistService:WishlistService) {
      wishlistService.initWishlistLocalStorage()
  }
}
