import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './pages/books/books-list/books-list.component';
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
        path:'books',
        component: BooksListComponent
    
      },

    
    ],
  },
  {
    path:'**',
    redirectTo: '/app'
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash: true}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
