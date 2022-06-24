// ANGULAR
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// ME
import { BooksListComponent } from './pages/books/books-list/books-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SubjectsListComponent } from './pages/subjects/subjects-list/subjects-list.component';
import { SubjectsFormComponent } from './pages/subjects/subjects-form/subjects-form.component';
import { BooksFormComponent } from './pages/books/books-form/books-form.component';
import { AutorsFormComponent } from './pages/autors/autors-form/autors-form.component';
import { AutorsListComponent } from './pages/autors/autors-list/autors-list.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { AuthAdminGuard, } from '@frontend/auth';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';

const routes: Routes = [


  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthAdminGuard],
    canLoad: [AuthAdminGuard],

    // canLoad: [AuthGuard],

    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'subjects',
        component: SubjectsListComponent,
      },
      {
        path: 'subjects/form',
        component: SubjectsFormComponent,
      },
      {
        path: 'subjects/form/:id',
        component: SubjectsFormComponent,
      },
      {
        path: 'books',
        component: BooksListComponent,
      },
      {
        path: 'books/form',
        component: BooksFormComponent,
      },
      {
        path: 'books/form/:id',
        component: BooksFormComponent,
      },
      {
        path: 'autors',
        component: AutorsListComponent,
      },
      {
        path: 'autors/form',
        component: AutorsFormComponent,
      },
      {
        path: 'autors/form/:id',
        component: AutorsFormComponent,
      },
      {
        path: 'users',
        component: UsersListComponent,
      },
      {
        path: 'users/form',
        component: UsersFormComponent,
      },
      {
        path: 'users/form/:id',
        component: UsersFormComponent,
      },
      {
        path: 'orders',
        component: OrdersListComponent,
      },

      {
        path: 'orders/detail/:id',
        component: OrdersDetailComponent,
      },


    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('@frontend/auth').then((m) => m.AuthModule),

  },
  {
    path: '**',
    redirectTo: '/',
  },




];

@NgModule({
  // imports: [RouterModule.forRoot(routes, { useHash: true , initialNavigation: 'enabled'}), AuthModule],
  imports: [RouterModule.forRoot(routes, { useHash: true})],

  exports: [RouterModule],
})
export class AppRoutingModule {}
