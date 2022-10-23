import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IItem, IOrder } from 'interfaces';
import { Observable, take } from 'rxjs';
import { OrderService } from '../../../services/order.service';
import { selectAllLearningAsItems, selectAllOrders } from '../../../state/orders.selectors';

@Component({
  selector: 'frontend-my-learning-list',
  templateUrl: './my-learning-list.component.html',
})
export class MyLearningListComponent implements OnInit {
  allOrders$!: Observable<IOrder[]> ;
  allItems$!: Observable<IItem[]> ;


  constructor(private orderService: OrderService, private store: Store) {}

  ngOnInit(): void {

    this.reload()
  }
  reload() {
    this.allOrders$ = this.store.pipe(select(selectAllOrders))
    this.allItems$ = this.store.pipe(select(selectAllLearningAsItems))

  }
}
