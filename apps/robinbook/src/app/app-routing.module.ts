import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent, BooksResolver, BookViewComponent, WishlistComponent } from '@frontend/book-base';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './shared/main/main.component';
import {  IsLoggedIn,IsLoggedOut} from '@frontend/auth-base';

const routes: Routes = [
  {
    path: 'app',
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        // component: TestComponent,
      },
      {
        path: 'books',
        loadChildren: () =>
          import('@frontend/book-base').then((m) => m.BookBaseModule),
      },

      {
        path: 'order',
        loadChildren: () =>
          import('@frontend/order').then((m) => m.OrderModule),
        canActivate: [IsLoggedIn],
      },


    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('@frontend/auth-user').then((m) => m.AuthUserModule),
    canActivate: [IsLoggedOut],
    
  },
  {
    path: 'checkout',
    loadChildren: () => import('@frontend/checkout').then((m) => m.CheckoutModule),
    
  },
  {
    path:'**',
    redirectTo: '/app/books'
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
