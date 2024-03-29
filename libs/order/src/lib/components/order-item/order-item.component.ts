import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { IOrder } from '@frontend/utils';
import { ORDER_CONDITION } from '../../helpers/order-conditions';

@Component({
  selector: 'frontend-order-item',
  templateUrl: './order-item.component.html',
})
export class OrderItemComponent implements OnInit {
  RAW_URL = environment.RAW_URL;
  orderCondition = ORDER_CONDITION;

  @Input() order!: IOrder;

  constructor() {}

  ngOnInit(): void {
  }


}
