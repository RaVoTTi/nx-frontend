import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { min, tap, timer } from 'rxjs';
// import { AuthBaseService } from '../../services/auth.service';
// import { LocalStorageService } from '../../services/local-storage.service';
import { Store } from '@ngrx/store';
import { AuthBaseService, AuthActions } from '@frontend/auth-base';
import {
  AlertService,
  ErrorHandlerService,
  ValidatorsService,
} from '@frontend/utils';
import { ILogin } from '@frontend/utils';

@Component({
  selector: 'frontend-auth-view',
  templateUrl: './auth-view.component.html',
})
export class AuthViewComponent implements OnInit {
  loginForm!: FormGroup;
  signUpForm!: FormGroup;

  login = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authBaseService: AuthBaseService,
    private store: Store,
    private alert: AlertService,
    private errorH: ErrorHandlerService,
    private vs: ValidatorsService // private messageService: MessageService
  ) {
    this.router.url.includes('signup')
      ? (this.login = false)
      : (this.login = true);
  }

  ngOnInit(): void {
    this._initForm();
  }
  onSubmit() {
    if (this.login) {
      this.loginForm.disable();
      this._login();
    } else {
      this.signUpForm.disable();

      this._postSignUp();
    }
  }
  private _login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.loginForm.value as ILogin;
    this.authBaseService
      .postLogin({ email, password })
      .pipe(
        tap(({ token }) => {
          if (token) {
            this.store.dispatch(AuthActions.login({ token }));
            this.router.navigate(['/app']);
          }
        })
      )
      .subscribe({
        error: ({ error }) => {
          this.loginForm.enable();
          this.alert.fire({
            icon: 'error',
            text: error?.msg ? error?.msg : 'Something happened',
          });
        },
      });
  }
  private _postSignUp() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    this.authBaseService
      .postSignUp(this.signUpForm.value)
      .pipe(
        tap((response) => {
          if (response.ok) {
            this.alert.fire({
              icon: 'success',
              text: 'User Created succesful',
            });
          }
        })
      )
      .subscribe({
        error: ({ error }) => {
          this.signUpForm.enable();
          this.alert.fire({
            icon: 'error',
            text: error?.msg ? error?.msg : 'Something happened',
          });
        },
      });

    // this.authBaseService.postSignUp(this.signUpForm.value);
    // .subscribe((response) => {
    //   if (response.ok) {
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Success',
    //       detail: response.msg[0],
    //     });
    //     timer(1000).subscribe(() => {
    //       this.router.navigate(['/auth/login']);
    //     });
    //   } else {
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: response.msg[0] as
    //         | string
    //         | 'The Category could not be created',
    //     });
    //   }
    // });
  }

  private _initForm() {
    if (this.login) {
      this.loginForm = this.formBuilder.group({
        email: [
          'fasedaff@test.com',
          [Validators.required, this.vs.validatePat('emailPat')],
        ],
        password: [
          'aA123456',
          [Validators.required, this.vs.validatePat('passwordPat')],
        ],
      });
    } else {
      this.signUpForm = this.formBuilder.group(
        {
          name: ['', [Validators.required, this.vs.validatePat('namePat')]],
          lastName: ['', [Validators.required, this.vs.validatePat('namePat')]],
          email: ['', [Validators.required, this.vs.validatePat('emailPat')]],
          phone: ['', [Validators.required, this.vs.validatePat('phone')]],
          password: [
            '',
            [Validators.required, this.vs.validatePat('passwordPat')],
          ],
          password2: ['', [Validators.required]],
          terms: [false, [Validators.required, Validators.requiredTrue]],
        },
        {
          validators: [this.vs.passwordMismatch('password', 'password2')],
        }
      );
    }
  }

  // controlError(key: string): { [key: string]: string } | null {
  //   if (this.login) {
  //     return this.loginForm.controls[key].errors;
  //   } else {
  //     return this.signUpForm.controls[key].errors;
  //   }
  // }

  errorMsg(key: string) {
    if (this.login) {
      return this.errorH.errorMsg(this.loginForm.controls[key]);
    } else {
      return this.errorH.errorMsg(this.signUpForm.controls[key]);
    }
  }
}
