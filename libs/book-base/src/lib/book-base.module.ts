import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { WishlistService } from './services/wishlist.service';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { WishlistIconComponent } from './components/wishlist-icon/wishlist-icon.component';
import { WishlistItemComponent } from './components/wishlist-item/wishlist-item.component';


@NgModule({
  imports: [CommonModule, BadgeModule, RouterModule],
declarations:[
  WishlistComponent,
  WishlistIconComponent,
  WishlistItemComponent
],
exports:[
  WishlistIconComponent,

]

})
export class BookBaseModule {
  constructor(wishlistService:WishlistService) {
    wishlistService.initWishlistLocalStorage()
}
}
