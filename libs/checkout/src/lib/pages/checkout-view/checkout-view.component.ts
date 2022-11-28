import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@env/environment';
import { take } from 'rxjs';
import { CheckoutService } from '../../services/checkout.service';
import { AlertService } from '@frontend/utils';
declare global {
  // interface Window {
  //   Stripe?: any;
  // }
}

@Component({
  selector: 'frontend-checkout-view',
  templateUrl: './checkout-view.component.html',
})
export class CheckoutViewComponent implements OnInit {
  bookId!: string;
  orderData!: any;

  private readonly STRIPE!: any; //TODO: window.Stripe
  private elementStripe!: any;
  private elements!: any;

  checkoutForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertService,
    private checkoutService: CheckoutService,
    private route: ActivatedRoute
  ) {
    // this.STRIPE = window.Stripe(environment.STRIPE_KEY);
  }

  ngOnInit(): void {
    // this.checkoutForm = this.formBuilder.group({
    //   amount: [
    //     '',
    //     [Validators.required, Validators.min(1), Validators.max(100000)],
    //   ],
    //   cardNumber: [false, [Validators.required, Validators.requiredTrue]], //TODO true | false
    //   cardCvv: [false, [Validators.required, Validators.requiredTrue]], //TODO true | false
    //   cardExp: [false, [Validators.required, Validators.requiredTrue]], //TODO true | false
    // });
    this._postMyPlaceOrder();
    this.checkStatus();

    // this.createStripeElement();
  }
  private _postMyPlaceOrder() {
    this.route.params.pipe(take(1)).subscribe((params) => {
      if (params['id']) {
        this.bookId = params['id'];
        // this.checkoutService
        //   .postMyPlaceOrder(this.bookId)
        //   .pipe(take(1))
        //   .subscribe(({ result }) => {
        //     if (result) {
        //       const appearance = {
        //         theme: 'flat',
        //       };
        //       this.elements = this.STRIPE.elements({
        //         appearance,
        //         clientSecret: result.client_secret,
        //       });

        //       const paymentElementOptions = {
        //         layout: 'tabs',
        //       };

        //       const paymentElement = this.elements.create(
        //         'payment',
        //         paymentElementOptions
        //       );
        //       paymentElement.mount('#payment-element');
        //     } else {
        //       this.alert.fire({
        //         text: 'Something wrong have happened',
        //         icon: 'error',
        //       });
        //     }
        //   });
      }
    });
  }

  async initPay(): Promise<any> {
    const { error } = await this.STRIPE.confirmPayment({
      elements: this.elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'http://localhost:4242/checkout.html',
      },
    });
    if (error.type === 'card_error' || error.type === 'validation_error') {
      this.alert.fire({ text: error.message, icon: 'error' });
    } else {
      this.alert.fire({ text: 'An unexpected error occurred.', icon: 'error' });
    }
  }
  async checkStatus() {
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    const { paymentIntent } = await this.STRIPE.retrievePaymentIntent(clientSecret);

    switch (paymentIntent.status) {
      case 'succeeded':
        this.alert.fire({ text: 'Payment succeeded!', icon: 'error' });

        break;
      case 'processing':
        this.alert.fire({ text: 'Your payment is processing.', icon: 'error' });

        break;
      case 'requires_payment_method':
        this.alert.fire({ text:'Your payment was not successful, please try again.', icon: 'error' });

        break;
      default:
        this.alert.fire({ text: 'Something went wrong.', icon: 'error' });

        break;
    }
  }
}
