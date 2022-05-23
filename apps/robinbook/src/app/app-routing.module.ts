import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './pages/books/books.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'books',
    component: BooksComponent

  },
  {
    path:'**',
    redirectTo: '/home'
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash: true}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
