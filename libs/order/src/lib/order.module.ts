import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyLearningListComponent } from './pages/my-learning/my-learning-list/my-learning-list.component';
import { MyLearningViewComponent } from './pages/my-learning/my-learning-view/my-learning-view.component';
import { MyOrderingComponent } from './pages/my-ordering/my-ordering.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { LearningItemComponent } from './components/card-learning/card-learning.component';


// NGRX
import {EntityDataService, EntityDefinitionService, EntityMetadataMap} from '@ngrx/data';


// PRIME NG 
import { ToastModule } from 'primeng/toast';
import {RatingModule} from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';


import { BookBaseModule, BooksResolver } from '@frontend/book-base';
import { MyEvaluationViewComponent } from './pages/my-evaluation-view/my-evaluation-view.component';

import { UtilsModule } from '@frontend/utils';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { OrdersEffects } from './state/orders.effects';
import { ordersReducer } from './state/orders.reducer';
import { OrdersResolver } from './services/order.resolver';

const entityMetadata : EntityMetadataMap ={
  Order: {
    
  }
}

const routes: Routes = [
  {
    path: 'placeorder/:id',
    component: PlaceOrderComponent,
  },
  {
    path: 'mylearning',
    component: MyLearningListComponent,
    resolve: {
      books: BooksResolver,
      orders: OrdersResolver,
    },
  },
  {
    path: 'mylearning/:id',
    component: MyLearningViewComponent,

  },
  {
    path: 'myevaluation/:id',
    component: MyEvaluationViewComponent,
  },
  {
    path: 'myordering',
    component: MyOrderingComponent,
    resolve: {
      orders: OrdersResolver,
    },
  },

];
const UX_MODULE = [
  RatingModule,
  TagModule,
  DropdownModule,
  ToastModule,

];

@NgModule({
  imports: [
    UtilsModule,
    BookBaseModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ...UX_MODULE,
    StoreModule.forFeature('orders', ordersReducer),

    EffectsModule.forFeature([OrdersEffects]),
  ],
  declarations: [
    PlaceOrderComponent,
    MyLearningListComponent,
    MyLearningViewComponent,
    MyOrderingComponent,
    LearningItemComponent,
    OrderItemComponent,
    MyEvaluationViewComponent
  ],
  providers:[
    OrdersResolver
  ]
})
export class OrderModule {
  // constructor (private eds : EntityDefinitionService) {
  //   eds.registerMetadataMap(entityMetadata)
  // }
}
