import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutViewComponent } from './pages/checkout-view/checkout-view.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '@frontend/utils';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { BookBaseModule, BooksResolver } from '@frontend/book-base';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from '@env/environment';

const routes: Routes = [
  
  {
    path: 'placeorder/:id',
    component: PlaceOrderComponent,
    resolve: {
      books: BooksResolver,
    },
  },
  {
    path: 'stripe/:id',
    component: CheckoutViewComponent,
  },
];

@NgModule({
  imports: [
    BookBaseModule,
    CommonModule,
    ReactiveFormsModule,
    UtilsModule,
    RouterModule.forChild(routes),
    NgxStripeModule.forChild(environment.STRIPE_KEY),

  ],
  declarations: [CheckoutViewComponent, PlaceOrderComponent],
})
export class CheckoutModule {}
