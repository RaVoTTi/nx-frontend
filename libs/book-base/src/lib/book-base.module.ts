// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// PRIMENG
import { RatingModule } from 'primeng/rating';
import { BadgeModule } from 'primeng/badge';
// ME

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WishlistService } from './services/wishlist.service';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { WishlistIconComponent } from './components/wishlist-icon/wishlist-icon.component';
import { CardBookComponent } from './components/card-book/card-book.component';
import { MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { SearchHeaderComponent } from './components/search-header/search-header.component';

const UX_MODULE = [MenuModule, InputTextModule, RatingModule, BadgeModule];
@NgModule({
  imports: [CommonModule,  ...UX_MODULE],
  declarations: [
    WishlistComponent,
    WishlistIconComponent,
    CardBookComponent,
    SearchHeaderComponent
  ],
  exports: [WishlistIconComponent, CardBookComponent, SearchHeaderComponent],
  providers: [MessageService],
})
export class BookBaseModule {
  constructor(wishlistService: WishlistService) {
    wishlistService.initWishlistLocalStorage();
  }
}
