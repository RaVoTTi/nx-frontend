import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'frontend-checkout-view',
  templateUrl: './checkout-view.component.html'
})
export class CheckoutViewComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }
  back(){
    this.location.back();
  }
}
