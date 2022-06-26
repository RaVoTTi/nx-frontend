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
  selector: 'frontend-checkout-view',
  templateUrl: './checkout-view.component.html',
})
export class CheckoutViewComponent implements OnInit {
  orderForm!: FormGroup;
  rawUrl = environment.rawUrl;
  couponForm = new FormControl('');
  bookId!: string;
  book!: IBook;
  checkoutComplete = false;

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
    this._initForm();
  }
  back() {
    this.location.back();
  }

  private _initForm() {
    this.orderForm = this.formBuilder.group({
      price: [1, [Validators.required]],
      addressLTC: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }
    console.log(this.orderForm.value)
    this.orderService
      .postMyOrder(this.bookId, this.orderForm.value)
      .pipe(take(1))
      .subscribe((response) => {
        if (response.ok === true) {
          this.router.navigate([`app/order/thanks/checkout`]);

        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response.msg[0] as
              | string
              | 'The book could not be purchased'
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
}
