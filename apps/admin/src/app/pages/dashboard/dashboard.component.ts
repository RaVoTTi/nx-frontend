import { Component, OnInit } from '@angular/core';
import { OrderService } from '@frontend/order';
import { BookService } from '@frontend/product';
import { UserService } from '@frontend/user-admin';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  orderCount = 0;
  bookCount = 0;
  userCount = 0;

  constructor(
    private orderService:OrderService,
    private bookService:BookService,
    private userService:UserService,


  ) {}

  ngOnInit(): void {
  this._orderCount()    
  this._bookCount()    
  this._userCount()    

  }

  private _orderCount(){
    return this.orderService.getOrderCount().subscribe((response)=>{
      if(response.result){
        this.orderCount = response.result
      }
    })
  }
  private _bookCount(){
    return this.bookService.getBookCount().subscribe((response)=>{
      if(response.result){
        this.bookCount = response.result
      }
    })
  }
  private _userCount(){
    return this.userService.getUserCount().subscribe((response)=>{
      if(response.result){
        this.userCount = response.result
      }
    })
  }

}
