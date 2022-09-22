// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// PRIMENG
import { RatingModule } from 'primeng/rating';
import { BadgeModule } from 'primeng/badge';
// ME

import { WishlistService } from './services/wishlist.service';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { WishlistIconComponent } from './components/wishlist-icon/wishlist-icon.component';
import { CardBookComponent } from './components/card-book/card-book.component';
import { MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { SearchHeaderComponent } from './components/search-header/search-header.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { UtilsModule } from '@frontend/utils';
import { BrowseBookComponent } from './components/browse-book/browse-book.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
const UX_MODULE = [MenuModule, InputTextModule, RatingModule, BadgeModule];
@NgModule({
  imports: [CommonModule, UtilsModule, ...UX_MODULE],
  declarations: [
    WishlistComponent,
    WishlistIconComponent,
    CardBookComponent,
    SearchHeaderComponent,
    DropdownComponent,
    ClickOutsideDirective,
    BrowseBookComponent,
    SpinnerComponent,
  ],
  exports: [
    WishlistIconComponent,
    ClickOutsideDirective,
    DropdownComponent,
    BrowseBookComponent,

    CardBookComponent,
    SearchHeaderComponent,
    SpinnerComponent,
  ],
  providers: [MessageService],
})
export class BookBaseModule {
  constructor(wishlistService: WishlistService) {
    wishlistService.initWishlistLocalStorage();
  }
}
