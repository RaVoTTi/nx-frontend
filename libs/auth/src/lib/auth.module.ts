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
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
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
  ],
  declarations: [LoginComponent],
  providers: [MessageService],
})
export class AuthModule {}
