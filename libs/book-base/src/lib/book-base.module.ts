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

import { ClickOutsideDirective } from './directives/click-outside.directive';
import { NothingComponent } from './pages/nothing/nothing.component';
import { BooksListComponent } from './pages/books-list/books-list.component';
import { BookViewComponent } from './pages/book-view/book-view.component';
import { BooksResolver } from './services/books.resolver';
import { BookBaseEntityService } from './services/book-base-entity.service';
import { CardBookComponent } from '../../../book-base/src/lib/components/card-book/card-book.component';
import { WishlistIconComponent } from './components/wishlist-icon/wishlist-icon.component';

const entityMetadata: EntityMetadataMap = {
  Book: {},
  Wishlist: {},
};

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

  },
];

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    RouterModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    WishlistIconComponent,
    CardBookComponent,
    WishlistComponent,

    ClickOutsideDirective,
    BooksListComponent,
    BookViewComponent,
    NothingComponent,
  ],
  exports: [
    ClickOutsideDirective,
    WishlistIconComponent,
    CardBookComponent,
    BooksListComponent,
    BookViewComponent,
    NothingComponent,
  ],
  providers: [MessageService, BooksResolver, BookBaseEntityService],
})
export class BookBaseModule {
  constructor(
    wishlistService: WishlistService,
    private eds: EntityDefinitionService
  ) {
    wishlistService.initWishlistLocalStorage();
    eds.registerMetadataMap(entityMetadata);
  }
}
