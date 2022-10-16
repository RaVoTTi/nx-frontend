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
import { ThanksViewComponent } from './pages/thanks-view/thanks-view.component';
import { BookBaseModule } from '@frontend/book-base';
import { MyEvaluationViewComponent } from './pages/my-evaluation-view/my-evaluation-view.component';
import {RadioButtonModule} from 'primeng/radiobutton';

import { OrderEntityService } from './services/order-entity.service';
import { UtilsModule } from '@frontend/utils';

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
  },
  {
    path: 'thanks/checkout',
    component: ThanksViewComponent,
  },
  {
    path: 'thanks/evaluation',
    component: ThanksViewComponent,
  },

];
const UX_MODULE = [
  RatingModule,
  TagModule,
  DropdownModule,
  ToastModule,
  RadioButtonModule,

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
  ],
  declarations: [
    PlaceOrderComponent,
    MyLearningListComponent,
    MyLearningViewComponent,
    MyOrderingComponent,
    LearningItemComponent,
    OrderItemComponent,
    ThanksViewComponent,
    MyEvaluationViewComponent
  ],
  providers:[
    OrderEntityService
  ]
})
export class OrderModule {
  constructor (private eds : EntityDefinitionService) {
    eds.registerMetadataMap(entityMetadata)
  }
}
