import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@env/environment';
import { take } from 'rxjs';
import { CheckoutService } from '../../services/checkout.service';
import { AlertService } from '@frontend/utils';
declare global {
  interface Window {
    Stripe?: any;
  }
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
  cardNumber: any;
  cardCvv: any;
  cardExp: any;
  checkoutForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertService,
    private checkoutService: CheckoutService,
    private route: ActivatedRoute
  ) {
    this.STRIPE = window.Stripe(environment.STRIPE_KEY);
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

    this.createStripeElement();
  }
  private _postMyPlaceOrder() {
    this.route.params.pipe(take(1)).subscribe((params) => {
      if (params['id']) {
        this.bookId = params['id'];
        this.checkoutService
          .postMyPlaceOrder(this.bookId)
          .pipe(take(1))
          .subscribe(({ result }) => {
            if (result) {
              const appearance = {
                theme: 'flat',
              };
              const elements = this.STRIPE.elements({ appearance, clientSecret: result.client_secret });

              const paymentElementOptions = {
                layout: 'tabs',
              };

              const paymentElement = elements.create(
                'payment',
                paymentElementOptions
              );
              paymentElement.mount('#payment-element');
            } else {
              this.alert.fire({
                text: 'Something wrong have happened',
                icon: 'error',
              });
            }
          });
      }
    });
  }

  private createStripeElement = () => {
    const style = {
      base: {
        color: '#000000',
        fontWeight: 400,
        fontFamily: "'Poppins', sans-serif",
        fontSize: '20px',
        '::placeholder': {
          color: '#E3E2EC',
        },
      },
      invalid: {
        color: '#dc3545',
      },
    };

    this.elementStripe = this.STRIPE.elements({
      fonts: [
        {
          cssSrc:
            'https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400&display=swap',
        },
      ],
    });

    // const cardNumber = this.elementStripe.create('cardNumber', {
    //   placeholder: '4242 4242 4242 4242',
    //   style,
    //   classes: {
    //     base: 'input',
    //   },
    // });
    // const cardExp = this.elementStripe.create('cardExpiry', {
    //   placeholder: 'MM/AA',
    //   style,
    //   classes: {
    //     base: 'input',
    //   },
    // });
    // const cardCvc = this.elementStripe.create('cardCvc', {
    //   placeholder: '000',
    //   style,
    //   classes: {
    //     base: 'input',
    //   },
    // });

    // cardNumber.mount('#card');
    // cardExp.mount('#exp');
    // cardCvc.mount('#cvc');

    // this.cardNumber = cardNumber;
    // this.cardExp = cardExp;
    // this.cardCvv = cardCvc;

    // this.cardNumber.addEventListener('change', this.onChangeCard.bind(this));
    // this.cardExp.addEventListener('change', this.onChangeExp.bind(this));
    // this.cardCvv.addEventListener('change', this.onChangeCvv.bind(this));
  };

  async initPay(): Promise<any> {
    try {
      this.checkoutForm.disable();
      const { token } = await this.STRIPE.createToken(this.cardNumber);

      const { result } = await this.checkoutService.patchCheckout(
        this.bookId,
        token.id
      );

      this.STRIPE.confirmCardPayment(result?.client_secret)
        .then(async () => {
          console.log(result);
          this.alert.fire(
            { icon: 'success', text: 'Your paid was aproved' },
            {
              urlConfi: '/app/books', // 🔴 TODOOO
            }
          );
          await this.checkoutService.getConfirmOrder(this.bookId);
        })
        .catch(() => {
          this.alert.fire({
            text: 'Something wrong have happened',
            icon: 'error',
          });
        });
    } catch (e) {
      this.alert.fire({ text: 'Something wrong have happened', icon: 'error' });
    }
  }

  onChangeCard({ error }: any) {
    this.checkoutForm.patchValue({ cardNumber: !error });
  }

  onChangeCvv({ error }: any) {
    this.checkoutForm.patchValue({ cardCvv: !error });
  }

  onChangeExp({ error }: any) {
    this.checkoutForm.patchValue({ cardExp: !error });
  }
}
