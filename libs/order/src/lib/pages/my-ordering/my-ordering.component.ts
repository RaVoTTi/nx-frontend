import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IOrder } from '@frontend/utils';
import { OrderService } from '../../services/order.service';
import { take } from 'rxjs';


@Component({
  selector: 'frontend-my-ordering',
  templateUrl: './my-ordering.component.html'
})
export class MyOrderingComponent implements OnInit {

  orders: IOrder[]=[]

  constructor(
    private location: Location,
    private orderService: OrderService

  ) { }

  ngOnInit(): void {
    this.orderService
    .getMyOrders(0)
    .pipe(take(1))
    .subscribe(({result}) => {
      if(result){
        this.orders = result;

      }
    });
  }
  back(){
    this.location.back()
  }
}
