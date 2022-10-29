import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutViewComponent } from './pages/checkout-view/checkout-view.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '@frontend/utils';
const routes: Routes = [
  {
    path: 'stripe/:id',
    component: CheckoutViewComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UtilsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CheckoutViewComponent],
})
export class CheckoutModule {}
