import { Component, OnInit } from '@angular/core';
import { OrderService, ORDER_CONDITION } from '@frontend/order';
import { IOrder } from 'interfaces';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { take } from 'rxjs';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
})
export class OrdersListComponent implements OnInit {
  orders: IOrder[] = [];
  orderCondition = ORDER_CONDITION;

  constructor(
    private orderService: OrderService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getOrders();
  }

  deleteOrder(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Order?',
      header: 'Delete Order',
      icon: 'pi pi-danger',
      accept: () => {
        this.orderService
          .deleteOrder(id)
          .pipe(take(1))
          .subscribe((response) => {
            if (response.ok === true) {
              this._getOrders();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: response.msg[0],
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: response.msg[0] as
                  | string
                  | 'The Order could not be eliminated',
              });
            }
          });
      },
    });
  }
  _getOrders() {
    this.orderService
      .getOrders('both')
      .pipe(take(1))
      .subscribe((response) => {
        this.orders = response.result ? response.result : [];
      });
  }
}
