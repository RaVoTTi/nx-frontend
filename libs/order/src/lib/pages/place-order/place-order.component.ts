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
import { BookBaseService } from '@frontend/book-base';
import { IBook } from 'interfaces';
import { environment } from '@env/environment';
import { OrderService } from '../../services/order.service';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'frontend-place-order',
  templateUrl: './place-order.component.html',
})
export class PlaceOrderComponent implements OnInit {
  orderForm!: FormGroup;
  RAW_URL = environment.RAW_URL;
  couponForm = new FormControl('');
  bookId!: string;
  book!: IBook;
  checkoutComplete = false;
  minPrice!: number;
  maxPrice!: number;
  init = false;
  price!:number;

  defaultCondition = ORDER_CONDITION[0];

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private bookBaseService: BookBaseService,
    private orderService: OrderService,
    private messageService: MessageService,
    private router: Router
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
      addressLTC: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }
    this.orderService
      .postMyOrder(this.bookId, this.orderForm.value)
      .pipe(take(1))
      .subscribe((response) => {
        if (response.ok === true) {
          this.router.navigate([`checkout/stripe/${response.result}`]);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response.msg[0] as
              | string
              | 'The book could not be purchased',
          });
        }
      });
  }

  onSubmitCoupon() {
    this.couponForm.markAsTouched();
  }
  private _getBook() {
    this.route.params.pipe(take(1)).subscribe((params) => {
      if (params['id']) {
        this.bookId = params['id'];
        this.bookBaseService
          .getBookBaseById(this.bookId)
          .pipe(take(1))
          .subscribe(({ result }) => {
            if (result) {
              this.book = result;
              this.minPrice = this.book.minPrice;
              this.maxPrice = this.book.maxPrice;
              this.price = this.book.minPrice

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
    }else{
      this.price = this.getPrice()
    }
  }
}
