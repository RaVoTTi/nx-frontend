import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'interfaces';
import { take } from 'rxjs';
import { OrderService } from '../../../services/order.service';
import { Location } from '@angular/common';

@Component({
  selector: 'frontend-my-learning-view',
  templateUrl: './my-learning-view.component.html',
})
export class MyLearningViewComponent implements OnInit {
  orderId!: string;
  order!: IOrder;

  constructor(
    private route: ActivatedRoute,
    private location: Location,

    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params) => {
      if (params['id']) {
        this.orderId = params['id'];
        this.orderService
          .getMyOrderById(this.orderId)
          .pipe(take(1))
          .subscribe(({ result }) => {
            if (result) {
              this.order = result;
              
            }
          });
      }
    });
  }
  back() {
    this.location.back();
  }
}
