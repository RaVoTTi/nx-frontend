import { Component, OnInit } from '@angular/core';
import { IOrder } from '@frontend/utils';
import { MyOrdersService } from '../../services/my-orders.service';

@Component({
  selector: 'frontend-my-orders-list',
  templateUrl: './my-orders-list.component.html'
})
 export class MyOrdersListComponent implements OnInit {

  orders: IOrder[]=[]

  constructor(
    private orderService: MyOrdersService

  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // ngOnInit(): void {
  //   this.orderService
  //   .getMyOrders(0)
  //   .pipe(take(1))
  //   .subscribe(({result}) => {
  //     if(result){
  //       this.orders = result;

  //     }
  //   });
  // }


}
