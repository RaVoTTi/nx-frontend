import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ICoin {
  name: string,
  id: number
}
@Component({
  selector: 'frontend-checkout-view',
  templateUrl: './checkout-view.component.html',
})
export class CheckoutViewComponent implements OnInit {
  userForm!: FormGroup;
  addressForm!: FormGroup;
  cryptoAddressForm!: FormGroup;

  coins: ICoin[]

  constructor(
    private formBuilder: FormBuilder,

    private location: Location
  ) {
this.coins = [
    {
      name: 'BTC',
      id: 1,
    },
    {
      name: 'LTC',
      id: 1,
    },
    
    {
      name: 'ADA',
      id: 1,
    },
  ];


  }

  ngOnInit(): void {
    this._initForm();
  }
  back() {
    this.location.back();
  }
  private _initForm() {
    this.addressForm = this.formBuilder.group({});
    this.cryptoAddressForm = this.formBuilder.group({});

    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: [Number, Validators.required],

      state: [true, Validators.required],
      isAdmin: [false, Validators.required],

      address: this.addressForm,
      cryptoAddress: this.cryptoAddressForm,
    });
  }
  validateCamp(key: string) {
    return (
      this.userForm.controls[key].errors && this.userForm.controls[key].touched
    );
  }
}
