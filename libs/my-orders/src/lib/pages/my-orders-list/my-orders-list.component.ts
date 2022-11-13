import { Component, HostListener, OnInit } from '@angular/core';
import { IOrder } from '@frontend/utils';
import { take } from 'rxjs';
import { MyOrdersService } from '../../services/my-orders.service';

@Component({
  selector: 'frontend-my-orders-list',
  templateUrl: './my-orders-list.component.html'
})
 export class MyOrdersListComponent implements OnInit {

  orders: IOrder[]=[]
  screenWidth: any;

  constructor(
    private myOrdersService: MyOrdersService

  ) { }
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  ngOnInit(): void {
    this.myOrdersService
    .getMyOrders(0)
    .pipe(take(1))
    .subscribe(({result}) => {
      if(result){
        this.orders = result;

      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
  }
}
