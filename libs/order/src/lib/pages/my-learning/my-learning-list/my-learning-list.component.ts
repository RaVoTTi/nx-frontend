import { Component, OnInit } from '@angular/core';
import { IOrder } from 'interfaces';
import { take } from 'rxjs';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'frontend-my-learning-list',
  templateUrl: './my-learning-list.component.html'
})
export class MyLearningListComponent implements OnInit {

  orders: IOrder[]| undefined

  constructor(
    private orderService:OrderService
  ) { }

  ngOnInit(): void {
     this.orderService
       .getMyOrders(1)
       .pipe(take(1))
       .subscribe(({result}) => {
         if(result){
           this.orders = result;

         }
       });

  }

}
