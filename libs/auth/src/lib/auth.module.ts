// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// PRIME NG
// import { ButtonModule } from 'primeng/button';
// import { InputTextModule } from 'primeng/inputtext';
// import { MessageService } from 'primeng/api';
// import { ToastModule } from 'primeng/toast';
// ME
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthViewComponent } from './pages/auth-view/auth-view.component';
import { AdminAuthViewComponent } from './pages/admin-auth-view/admin-auth-view.component';
import { authReducer } from './state/auth.reducer';
import { AuthEffects } from './state/auth.effects';
import { LoginGuard } from './guard/login.guard';

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
      {
        path: 'admin/login/pppp',

        component: AdminAuthViewComponent,
      },
      {
        path: '**',
        redirectTo: 'auth/login',
      },
    ],
  },

];
@NgModule({
  imports: [
    // ToastModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,

    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [AuthViewComponent, AdminAuthViewComponent],
  providers: [],
})
export class AuthModule {}
