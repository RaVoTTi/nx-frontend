import { Component, OnInit } from '@angular/core';
import { OrderService } from '@frontend/order';
import { BookService } from '@frontend/book-admin';
import { UserService } from '@frontend/user-admin';
import { take } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  orderCount!: number;
  bookCount!: number;
  userCount!: number;
  orderIncome!: number;


  constructor(
    private orderService: OrderService,
    private bookService: BookService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this._orderCount();
    this._bookCount();
    this._userCount();
    this._orderIncome();
  }

  private _orderCount() {
    return this.orderService.getOrderCount().pipe(take(1)).subscribe((response) => {
      if (response.result) {
        this.orderCount = response.result;
      }
    });
  }
  private _bookCount() {
    return this.bookService.getBookCount().pipe(take(1)).subscribe((response) => {
      if (response.result) {
        this.bookCount = response.result;
      }
    });
  }
  private _userCount() {
    return this.userService.getUserCount().pipe(take(1)).subscribe((response) => {
      if (response.result) {
        this.userCount = response.result;
      }
    });
  }
  private _orderIncome() {
    return this.orderService.getOrderIncome().pipe(take(1)).subscribe((response) => {
      if (response.result) {
        this.orderIncome = response.result;
      }
    });
  }
}
