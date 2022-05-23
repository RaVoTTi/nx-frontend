import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), InputTextModule],
  declarations: [LoginComponent],
})
export class UserModule {}
