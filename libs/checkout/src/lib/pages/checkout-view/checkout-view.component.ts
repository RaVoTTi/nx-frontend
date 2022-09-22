import { Component, OnInit, ViewChild } from '@angular/core';
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
  // @ViewChild('deleteSwal')

  // public readonly deleteSwal!: SwalComponent;
  orderId!: string;
  orderData!: any;

  private readonly STRIPE!: any; //TODO: window.Stripe
  private elementStripe!: any;
  cardNumber: any;
  cardCvv: any;
  cardExp: any;
  checkoutForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    // private cd: ChangeDetectorRef,
    private alert: AlertService,
    private checkoutService: CheckoutService,
    private route: ActivatedRoute
  ) {
    this.STRIPE = window.Stripe(environment.STRIPE_KEY);
  }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      amount: [
        '',
        [Validators.required, Validators.min(1), Validators.max(100000)],
      ],
      cardNumber: [false, [Validators.required, Validators.requiredTrue]], //TODO true | false
      cardCvv: [false, [Validators.required, Validators.requiredTrue]], //TODO true | false
      cardExp: [false, [Validators.required, Validators.requiredTrue]], //TODO true | false
    });
    this._getPreOrder();
    this.createStripeElement();
  }
  private _getPreOrder() {
    this.route.params.pipe(take(1)).subscribe((params) => {
      if (params['id']) {
        this.orderId = params['id'];
        this.checkoutService
          .getPreOrder(this.orderId)
          .subscribe(({ result }) => {
            if (result) {
              this.orderData = result;

              if (result?.condition > 0) {
                this.checkoutForm.disable();
                this.alert.errorRedirectAlert('The order has already paid');
              }
              this.checkoutForm.patchValue({
                amount: result.price,
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

    //TODO: SDK de Stripe inicia la generacion de elementos
    this.elementStripe = this.STRIPE.elements({
      fonts: [
        {
          cssSrc:
            'https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400&display=swap',
        },
      ],
    });

    //TODO: SDK Construimos los inputs de tarjeta, cvc, fecha con estilos
    const cardNumber = this.elementStripe.create('cardNumber', {
      placeholder: '4242 4242 4242 4242',
      style,
      classes: {
        base: 'input',
      },
    });
    const cardExp = this.elementStripe.create('cardExpiry', {
      placeholder: 'MM/AA',
      style,
      classes: {
        base: 'input',
      },
    });
    const cardCvc = this.elementStripe.create('cardCvc', {
      placeholder: '000',
      style,
      classes: {
        base: 'input',
      },
    });

    //TODO: SDK Montamos los elementos en nuestros DIV identificados on el #id
    cardNumber.mount('#card');
    cardExp.mount('#exp');
    cardCvc.mount('#cvc');

    this.cardNumber = cardNumber;
    this.cardExp = cardExp;
    this.cardCvv = cardCvc;

    //TODO: Escuchamos los eventos del SDK
    this.cardNumber.addEventListener('change', this.onChangeCard.bind(this));
    this.cardExp.addEventListener('change', this.onChangeExp.bind(this));
    this.cardCvv.addEventListener('change', this.onChangeCvv.bind(this));
  };

  async initPay(): Promise<any> {
    try {
      this.checkoutForm.disable();
      //TODO: SDK de Stripe genera un TOKEN para la intencion de pago!
      const { token } = await this.STRIPE.createToken(this.cardNumber);
      //TODO: Enviamos el token a nuesta api donde generamos (stripe) un metodo de pago basado en el token
      //TODO: tok_23213
      this.checkoutService
        .patchSendPayment(this.orderId, token.id)
        .pipe(take(1))
        .subscribe(({ result }) => {
          this.STRIPE.confirmCardPayment(result?.client_secret)
            .then(async () => {
              console.log('MONEY');
              this.alert.succeRedirectAlert({});

              //TODO: 👌 Money Money!!!
              // this.toaster.open({text: 'Dinerito dineron', caption: 'Yeah!', type: 'success'})
              //TODO: Enviamos el id "localizador" de nuestra orden para decirle al backend que confirme con stripe si es verdad!
              this.checkoutService
                .getConfirmOrder(this.orderId)
                .pipe(take(1))
                .subscribe(({ result }) => {
                  console.log('Really Money');
                });
            })
            .catch(() => {
              this.alert.errorRedirectAlert('Something happened');
            });
        });
      //TODO: Nuestra api devolver un "client_secret" que es un token unico por intencion de pago
      //TODO: SDK de stripe se encarga de verificar si el banco necesita autorizar o no
    } catch (e) {
      this.alert.errorRedirectAlert('Something happened');
    }
  }

  //TODO: Manejadores de validacion de input de stripe

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
