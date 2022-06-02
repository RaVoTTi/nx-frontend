import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './pages/books/books-list/books-list.component';
import { BooksViewComponent } from './pages/books/books-view/books-view.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'app',
    children: [
      {
        path:'home',
        component: HomeComponent
      },
      {
        path:'books',
        component: BooksListComponent
    
      },
      {
        path:'books/:id',
        component: BooksViewComponent
    
      },

    
    ],
  },
  {
    path:'**',
    redirectTo: '/app/home'
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash: true}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
