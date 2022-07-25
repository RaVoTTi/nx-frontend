import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, LoginGuard } from '@frontend/auth';
// import { AuthGuard } from '@frontend/auth';
import { WishlistComponent } from '@frontend/book-base';
import { BooksListComponent } from './pages/books/books-list/books-list.component';
import { BookViewComponent } from './pages/books/book-view/book-view.component';
import { HomeComponent } from './pages/home/home.component';
import { TestComponent } from './pages/test/test.component';
import { MainComponent } from './shared/main/main.component';

const routes: Routes = [
  {
    path: 'app',
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        // component: TestComponent,
        canActivate: [LoginGuard],

      },
      {
        path: 'books',
        component: BooksListComponent,
      },
      {
        path: 'books/:id',
        component: BookViewComponent,
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
        canActivate: [AuthGuard],
      },
      {
        path: '**',
        redirectTo: '/app/books',
      },

    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('@frontend/auth').then((m) => m.AuthModule),

  },
  {
    path: 'checkout',
    loadChildren: () => import('@frontend/checkout').then((m) => m.CheckoutModule),

  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
