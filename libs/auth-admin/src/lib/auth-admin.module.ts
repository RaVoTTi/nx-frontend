import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthBaseModule } from '@frontend/auth-base';
import { AdminAuthViewComponent } from './pages/admin-auth-view/admin-auth-view.component';


const routes: Routes = [
  {
    path: '',


    children: [
      {
        path: 'admin/login/pppp',

        component: AdminAuthViewComponent,
      },

    ],
  },
];

@NgModule({

  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    // UtilsModule,
    FormsModule,
    ReactiveFormsModule,
    AuthBaseModule,
  ],
  declarations:[
    AdminAuthViewComponent
  ]
})
export class AuthAdminModule {}
