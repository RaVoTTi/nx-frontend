// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterModule } from '@angular/router';


// ME
import { WishlistService } from './services/wishlist.service';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { WishlistIconComponent } from './components/wishlist-icon/wishlist-icon.component';
import { CardBookComponent } from './components/card-book/card-book.component';
import { MessageService } from 'primeng/api';
import { SearchHeaderComponent } from './components/search-header/search-header.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { UtilsModule } from '@frontend/utils';
import { BrowseBookComponent } from './components/browse-book/browse-book.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NothingComponent } from './nothing/nothing.component';
@NgModule({
  imports: [CommonModule, UtilsModule, RouterModule ],
  declarations: [
    WishlistComponent,
    WishlistIconComponent,
    CardBookComponent,
    SearchHeaderComponent,
    DropdownComponent,
    ClickOutsideDirective,
    BrowseBookComponent,
    SpinnerComponent,
    NothingComponent,
  ],
  exports: [
    WishlistIconComponent,
    ClickOutsideDirective,
    DropdownComponent,
    BrowseBookComponent,

    CardBookComponent,
    SearchHeaderComponent,
    SpinnerComponent,
    NothingComponent,
  ],
  providers: [MessageService],
})
export class BookBaseModule {
  constructor(wishlistService: WishlistService) {
    wishlistService.initWishlistLocalStorage();
  }
}
