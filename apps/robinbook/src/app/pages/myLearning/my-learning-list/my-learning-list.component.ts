import { OrderService } from '@frontend/order';
import { Component, OnInit } from '@angular/core';
import { IOrder } from 'interfaces';
import { take } from 'rxjs';

@Component({
  selector: 'robinbook-my-learning-list',
  templateUrl: './my-learning-list.component.html'
})
export class MyLearningListComponent implements OnInit {

  orders: IOrder[] = []
  constructor(
    private orderService:OrderService
  ) { }

  ngOnInit(): void {
     this.orderService
       .getMyOrders()
       .pipe(take(1))
       .subscribe(({result}) => {
         if(result){
           this.orders = result;

         }
       });

  }

}
