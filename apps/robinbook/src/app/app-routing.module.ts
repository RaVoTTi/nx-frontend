import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  BooksListComponent,
  BooksResolver,
  BookViewComponent,
  WishlistComponent,
} from '@frontend/book-base';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './shared/main/main.component';
import { IsLoggedIn, IsLoggedOut } from '@frontend/auth-base';

const routes: Routes = [
  {
    path: 'app',
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [IsLoggedOut],

        // component: TestComponent,
      },
      {
        path: 'books',
        component: BooksListComponent,

        resolve: {
          books: BooksResolver,
        },
      },
      {
        path: 'books/id/:id',
        component: BookViewComponent,
        resolve: {
          books: BooksResolver,
        },
      },

      {
        path: 'books/wishlist',
        component: WishlistComponent,
        resolve: {
          books: BooksResolver,
        },
      },
      
      {
        path: 'mylearning',
        loadChildren: () =>
          import('@frontend/my-learning').then((m) => m.MyLearningModule),
        canActivate: [IsLoggedIn],
      },
      {
        path: 'myorders',
        loadChildren: () =>
          import('@frontend/my-orders').then((m) => m.MyOrdersModule),
        canActivate: [IsLoggedIn],
      },
      {
        path: 'settings',
        loadChildren: () =>
        import('@frontend/settings').then((m) => m.SettingsModule),
        canActivate: [IsLoggedIn],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/app/books',
      },
    ],
  },

  {
    path: 'auth',

    loadChildren: () =>
      import('@frontend/auth-user').then((m) => m.AuthUserModule),
    canActivate: [IsLoggedOut],
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('@frontend/checkout').then((m) => m.CheckoutModule),
    canActivate: [IsLoggedIn],
  },
  {
    path: '**',
    redirectTo: '/app/books',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// {
//   path: 'order',
//   loadChildren: () =>
//     import('@frontend/order').then((m) => m.OrderModule),
//   canActivate: [IsLoggedIn],
// },
