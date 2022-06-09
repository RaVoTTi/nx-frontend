import { IOrder } from './../../../../../../interfaces/IOrder';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'frontend-order-item',
  templateUrl: './order-item.component.html',
})
export class OrderItemComponent implements OnInit {
  @Input() order!: IOrder;

  constructor(

  ) {}

  ngOnInit(): void {}
}
