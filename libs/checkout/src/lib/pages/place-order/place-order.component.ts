import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ORDER_CONDITION } from '../../helpers/order-conditions';
import { ActivatedRoute, Router } from '@angular/router';
import { take, timer } from 'rxjs';
import { BookBaseService, selectBooksById } from '@frontend/book-base';
import { AlertService, IBook } from '@frontend/utils';
import { environment } from '@env/environment';

import { MessageService } from 'primeng/api';
import { CheckoutService } from '../../services/checkout.service';
import { select, Store } from '@ngrx/store';
import { StripeService } from 'ngx-stripe';

@Component({
  selector: 'frontend-place-order',
  templateUrl: './place-order.component.html',
})
export class PlaceOrderComponent implements OnInit {
  orderForm!: FormGroup;
  RAW_URL = environment.RAW_URL;
  couponForm = new FormControl('');
  id!: string;
  book!: IBook;
  checkoutComplete = false;
  minPrice!: number;
  maxPrice!: number;
  init = false;
  price!: number;

  defaultCondition = ORDER_CONDITION[0];

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private bookBaseService: BookBaseService,
    private checkoutService: CheckoutService,
    private messageService: MessageService,
    private alertService: AlertService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this._getBook();
  }
  back() {
    this.location.back();
  }

  private _initForm(min: number, max: number) {
    this.orderForm = this.formBuilder.group({
      price: [
        min,
        [
          Validators.required,
          Validators.min(min),
          Validators.max(max),
          // Validators.pattern(/d+/),
        ],
      ],
    });
  }
  onSubmit() {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }
    this.checkoutService
      .postMyPlaceOrder(this.id)
      .subscribe(
        error => {
          if(error){
            this.alertService.fire({
              text: 'Something wrong have happened',
              icon: 'error',
            });
          }
        }
      );
    // this.router.navigate([`/checkout/stripe/${this.book._id}`]);
  }

  onSubmitCoupon() {
    this.couponForm.markAsTouched();
  }
  private _getBook() {
    this.route.params.pipe(take(1)).subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this.store
          .pipe(select(selectBooksById(this.id)), take(1))
          .subscribe((book) => {
            if (book) {
              this.book = book;
              this.minPrice = this.book.minPrice;
              this.maxPrice = this.book.maxPrice;
              this.price = this.book.minPrice;

              this._initForm(this.minPrice, this.maxPrice);
              this.init = true;
            }
          });
      }
    });
  }
  validateCamp(key: string) {
    return (
      this.orderForm.controls[key].errors &&
      this.orderForm.controls[key].touched
    );
  }
  validateCoupon() {
    return this.couponForm.touched;
  }
  getPrice() {
    return this.orderForm.get('price')?.value;
  }
  getPriceFormated() {
    if (
      !this.getPrice() ||
      this.orderForm.get('price')?.value < this.minPrice
    ) {
      this.price = this.minPrice;
      this.orderForm.patchValue({ price: this.minPrice });
    } else if (this.orderForm.get('price')?.value > this.maxPrice) {
      this.price = this.maxPrice;
      this.orderForm.patchValue({ price: this.maxPrice });
    } else {
      this.price = this.getPrice();
    }
  }
}
