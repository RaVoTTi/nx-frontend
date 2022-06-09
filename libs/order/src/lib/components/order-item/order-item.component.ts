import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { IOrder } from 'interfaces';
import { ORDER_CONDITION } from '../../helpers/order-conditions';

@Component({
  selector: 'frontend-order-item',
  templateUrl: './order-item.component.html',
})
export class OrderItemComponent implements OnInit {
  rawUrl = environment.rawUrl;
  orderCondition = ORDER_CONDITION;

  @Input() order!: IOrder;

  constructor() {}

  ngOnInit(): void {}

  print(){
    console.log(this.order.condition)
  }
}
