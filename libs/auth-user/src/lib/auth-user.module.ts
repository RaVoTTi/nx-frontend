import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthViewComponent } from './pages/auth-view/auth-view.component';
import { AuthBaseModule, LoginGuard } from '@frontend/auth-base';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '@frontend/utils';

const routes: Routes = [
  {
    path: '',
    canLoad: [LoginGuard],
    canActivate: [LoginGuard],

    children: [
      {
        path: 'login',
        component: AuthViewComponent,
      },
      {
        path: 'signup',
        component: AuthViewComponent,
      },
    ],
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UtilsModule,
    FormsModule,
    ReactiveFormsModule,
    AuthBaseModule,
  ],
  declarations: [AuthViewComponent],
})
export class AuthUserModule {}
