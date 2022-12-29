import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyOrderingComponent } from './pages/my-ordering/my-ordering.component';
import { OrderItemComponent } from './components/order-item/order-item.component';

// NGRX
import {
  EntityDataService,
  EntityDefinitionService,
  EntityMetadataMap,
} from '@ngrx/data';

// PRIME NG
import { ToastModule } from 'primeng/toast';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';

import { BookBaseModule, BooksResolver } from '@frontend/book-base';

import { UtilsModule } from '@frontend/utils';


const entityMetadata: EntityMetadataMap = {
  Order: {},
};

const routes: Routes = [

  {
    path: 'myordering',
    component: MyOrderingComponent,

  },
];
const UX_MODULE = [RatingModule, TagModule, DropdownModule, ToastModule];

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

    MyOrderingComponent,
    OrderItemComponent,
  ],
  providers: [],
})
export class OrderModule {
  // constructor (private eds : EntityDefinitionService) {
  //   eds.registerMetadataMap(entityMetadata)
  // }
}
