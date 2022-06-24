import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutViewComponent } from './pages/checkout-view/checkout-view.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyLearningListComponent } from './pages/my-learning/my-learning-list/my-learning-list.component';
import { MyLearningViewComponent } from './pages/my-learning/my-learning-view/my-learning-view.component';
import { MyOrderingComponent } from './pages/my-ordering/my-ordering.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { LearningItemComponent } from './components/learning-item/learning-item.component';


// PRIME NG 
import { ToastModule } from 'primeng/toast';

import {RatingModule} from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import { ThanksViewComponent } from './pages/thanks-view/thanks-view.component';
import { BookBaseModule } from '@frontend/book-base';
const routes: Routes = [
  {
    path: 'checkout/:id',
    component: CheckoutViewComponent,
  },
  {
    path: 'mylearning',
    component: MyLearningListComponent,
  },
  {
    path: 'mylearning/:id',
    component: MyLearningViewComponent,
  },
  {
    path: 'myordering',
    component: MyOrderingComponent,
  },
  {
    path: 'thanks',
    component: ThanksViewComponent,
  },

];
const UX_MODULE = [
  InputTextModule,
  RatingModule,
  TagModule,
  DropdownModule,
  ToastModule
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ...UX_MODULE,
  ],
  declarations: [
    CheckoutViewComponent,
    MyLearningListComponent,
    MyLearningViewComponent,
    MyOrderingComponent,
    LearningItemComponent,
    OrderItemComponent,
    ThanksViewComponent
  ],
})
export class OrderModule {}
