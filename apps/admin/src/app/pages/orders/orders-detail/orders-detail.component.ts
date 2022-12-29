import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService, ORDER_CONDITION } from '@frontend/order';
import { Location } from '@angular/common';
import { IOrder } from '@frontend/utils';
import { FormControl } from '@angular/forms';
// import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { take, timer } from 'rxjs';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
})
export class OrdersDetailComponent implements OnInit {
  orderId = '';
  order!: IOrder;
  condition = new FormControl('');
  orderConditions = ORDER_CONDITION;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private location: Location,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._initDetail();
  }
  private _initDetail() {
    this.route.params.pipe(take(1)).subscribe((params) => {
      if (params['id']) {
        this.orderId = params['id'];

        this.orderService
          .getOrderById(this.orderId)
          .pipe(take(1))
          .subscribe(({ ok, result }) => {
            if (!result) {
              this.location.back();
            } else {
              this.order = result;
            }
          });
      } else {
        this.location.back();
      }
    });
  }

  onSubmit() {
    if (!this.condition.pristine) {
      // this.orderService
      //   .patchOrder(this.orderId, this.condition.value)
      //   .pipe(take(1))
      //   .subscribe((response) => {
      //     if (response.ok === true) {
      //       this.messageService.add({
      //         severity: 'success',
      //         summary: 'Success',
      //         detail: response.msg[0],
      //       });
      //       timer(1000)
      //         .pipe(take(1))
      //         .subscribe(() => {
      //           this.back();
      //         });
      //     } else {
      //       this.messageService.add({
      //         severity: 'error',
      //         summary: 'Error',
      //         detail: response.msg[0] as
      //           | string
      //           | "The order couldn't be modificated",
      //       });
      //     }
      //   });
    }
  }

  back() {
    this.location.back();
  }
}
