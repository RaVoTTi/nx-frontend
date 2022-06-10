import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutViewComponent } from './pages/checkout-view/checkout-view.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyLearningListComponent } from './pages/my-learning/my-learning-list/my-learning-list.component';
import { MyLearningViewComponent } from './pages/my-learning/my-learning-view/my-learning-view.component';
import { InputTextModule } from 'primeng/inputtext';
import { MyOrderingComponent } from './pages/my-ordering/my-ordering.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { LearningItemComponent } from './components/learning-item/learning-item.component';
import {RatingModule} from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
const routes: Routes = [
  {
    path: 'checkout',
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

];
const UX_MODULE = [
  // CardModule,
  InputTextModule,
  TagModule,
  DropdownModule,
  // ToastModule,
  // ToolbarModule,
  // ButtonModule,
  // TableModule,
  // ConfirmDialogModule,
  // InputSwitchModule,
  // ColorPickerModule,
  // TagModule,
  // DropdownModule,
  // EditorModule,
  // InputMaskModule,

  // FieldsetModule,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    ...UX_MODULE,
  ],
  declarations: [
    CheckoutViewComponent,
    MyLearningListComponent,
    MyLearningViewComponent,
    MyOrderingComponent,
    LearningItemComponent,
    OrderItemComponent
  ],
})
export class OrderModule {}
