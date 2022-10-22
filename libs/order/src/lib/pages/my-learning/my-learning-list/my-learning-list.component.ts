import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IOrder } from 'interfaces';
import { Observable, take } from 'rxjs';
import { OrderService } from '../../../services/order.service';
import { selectAllOrders } from '../../../state/orders.selectors';

@Component({
  selector: 'frontend-my-learning-list',
  templateUrl: './my-learning-list.component.html',
})
export class MyLearningListComponent implements OnInit {
  orders!: Observable<IOrder[]> ;

  constructor(private orderService: OrderService, private store: Store) {}

  ngOnInit(): void {
    // this.orderService
    //   .getMyOrders(1)
    //   .pipe(take(1))
    //   .subscribe(({ result }) => {
    //     if (result) {
    //       this.orders = result;
    //     }
    //   });
    this.reload()
  }
  reload() {
    this.orders = this.store.pipe(select(selectAllOrders))
  }
}
