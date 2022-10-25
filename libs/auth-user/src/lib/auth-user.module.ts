import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthViewComponent } from './pages/auth-view/auth-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '@frontend/utils';

const routes: Routes = [
  {
    path: '',
    component: AuthViewComponent,
  },
  {
    path: 'signup',
    component: AuthViewComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UtilsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AuthViewComponent],
})
export class AuthUserModule {}
