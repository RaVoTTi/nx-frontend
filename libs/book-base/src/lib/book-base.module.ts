// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// NGRX
import {
  EntityDataService,
  EntityDefinitionService,
  EntityMetadataMap,
} from '@ngrx/data';

// ME
import { UtilsModule } from '@frontend/utils';
import { WishlistService } from './services/wishlist.service';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { MessageService } from 'primeng/api';

import { NothingComponent } from './pages/nothing/nothing.component';
import { BooksListComponent } from './pages/books-list/books-list.component';
import { BookViewComponent } from './pages/book-view/book-view.component';
import { BooksResolver } from './services/books.resolver';
import { CardBookComponent } from '../../../book-base/src/lib/components/card-book/card-book.component';
import { WishlistIconComponent } from './components/wishlist-icon/wishlist-icon.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from './state/books/books.effects';
import { booksReducer } from './state/books/books.reducer';
// import { WishResolver } from './services/wish.resolver';
// import { BookEffects } from './state/books.effects';



const routes: Routes = [

  {
    path: '',
    component: BooksListComponent,
    resolve: {
      books: BooksResolver,
    },
  },
  {
    path: 'id/:id',
    component: BookViewComponent,
  },

  {
    path: 'wishlist',
    component: WishlistComponent,
    resolve: {
      books: BooksResolver,
      // wish: WishResolver
    },
  },



];

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    RouterModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('books', booksReducer),

    EffectsModule.forFeature([BooksEffects]),

  ],
  declarations: [
    WishlistIconComponent,
    CardBookComponent,
    WishlistComponent,

    BooksListComponent,
    BookViewComponent,
    NothingComponent,
  ],
  exports: [
    WishlistIconComponent,
    CardBookComponent,
    BooksListComponent,
    BookViewComponent,
    NothingComponent,
  ],
  providers: [MessageService, BooksResolver, 
    // WishResolver
  ],
})
export class BookBaseModule {
  constructor(
    wishlistService: WishlistService,
  ) {
    wishlistService.initWishlistLocalStorage();
  }
}
