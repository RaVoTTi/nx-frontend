import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WishlistComponent } from '@frontend/book-base';
import { BooksListComponent } from './pages/books/books-list/books-list.component';
import { BooksViewComponent } from './pages/books/books-view/books-view.component';
import { HomeComponent } from './pages/home/home.component';
import { MyLearningListComponent } from './pages/myLearning/my-learning-list/my-learning-list.component';
import { MyLearningViewComponent } from './pages/myLearning/my-learning-view/my-learning-view.component';


const routes: Routes = [
  {
    path: 'app',
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
        path: 'mylearning',
        component: MyLearningListComponent,
      },
      {
        path: 'mylearning/:id',
        component: MyLearningViewComponent,
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/app/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash: true}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
