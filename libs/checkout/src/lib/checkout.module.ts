import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutViewComponent } from './pages/checkout-view/checkout-view.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '@frontend/utils';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { BookBaseModule, BooksResolver } from '@frontend/book-base';
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
  ],
  declarations: [CheckoutViewComponent, PlaceOrderComponent],
})
export class CheckoutModule {}
