import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutViewComponent } from './pages/checkout-view/checkout-view.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'stripe/:id',
        component: CheckoutViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, 
    ReactiveFormsModule,
    
    RouterModule.forChild(routes)],
  declarations: [CheckoutViewComponent],
})
export class CheckoutModule {}
