// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// PRIME NG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
// ME
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuths from './state/auths.reducer';
import { AuthsEffects } from './state/auths.effects';
import { AuthsFacade } from './state/auths.facade';
import { AuthViewComponent } from './pages/auth-view/auth-view.component';
import { AdminAuthViewComponent } from './pages/admin-auth-view/admin-auth-view.component';

const routes: Routes = [
  {
    path: '',
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
        path: 'login/admin/pppp',
        component: AdminAuthViewComponent,
      },
      {
        path: '**',
        redirectTo: '/auth/login',
      },
    ],
    
  },


];
@NgModule({
  imports: [
    ToastModule,
    CommonModule,
    ButtonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,

    StoreModule.forFeature(fromAuths.AUTHS_FEATURE_KEY, fromAuths.reducer),
    EffectsModule.forFeature([AuthsEffects]),
  ],
  declarations: [AuthViewComponent, AdminAuthViewComponent],
  providers: [MessageService, AuthsFacade],
})
export class AuthModule {}
