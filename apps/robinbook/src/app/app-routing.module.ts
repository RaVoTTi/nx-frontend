import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@frontend/auth';
// import { AuthGuard } from '@frontend/auth';
import { WishlistComponent } from '@frontend/book-base';
import { BooksListComponent } from './pages/books/books-list/books-list.component';
import { BooksViewComponent } from './pages/books/books-view/books-view.component';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './shared/main/main.component';

const routes: Routes = [
  {
    path: 'app',
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'books',
        component: BooksListComponent,
      },
      {
        path: 'books/:id',
        component: BooksViewComponent,
      },

      {
        path: 'wishlist',
        component: WishlistComponent,
      },
      {
        path: 'order',
        loadChildren: () =>
          import('@frontend/order').then((m) => m.OrderModule),
        // canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: '**',
        redirectTo: '/app/home',
      },

    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('@frontend/auth').then((m) => m.AuthModule),

  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
