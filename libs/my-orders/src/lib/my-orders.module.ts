import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MyOrdersListComponent } from './pages/my-orders-list/my-orders-list.component';
import { MyOrderViewComponent } from './pages/my-order-view/my-order-view.component';
import { MyOrdersResolver } from './services/my-orders.resolver';
import { BooksResolver } from '@frontend/book-base';
const routes: Routes = [
  {
    path: '',
    component: MyOrdersListComponent,
    resolve: {
      myOrders: MyOrdersResolver,
    },
  },
  {
    path: 'id/:id',
    component: MyOrderViewComponent,
    resolve: {
      books: BooksResolver,
      myOrders: MyOrdersResolver,
    },
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [MyOrdersListComponent, MyOrderViewComponent],
})
export class MyOrdersModule {}
