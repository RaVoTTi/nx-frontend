import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { min, timer } from 'rxjs';
// import { AuthService } from '../../services/auth.service';
// import { LocalStorageService } from '../../services/local-storage.service';
import { Store } from '@ngrx/store';
import { AuthService, LocalStorageService } from '@frontend/auth-base';
import { ErrorHandlerService, ValidatorsService } from '@frontend/utils';

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
    private authService: AuthService,
    private store: Store,
    private localStorageService: LocalStorageService,
    private errorH: ErrorHandlerService,
    private vs: ValidatorsService,
    private messageService: MessageService
  ) {
    this.router.url.includes('login')
      ? (this.login = true)
      : (this.login = false);
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
    this.authService.login(this.loginForm.value);
    // this.authService.postLogin(this.loginForm.value).subscribe((response) => {
    //   if (response.token) {
    //     this.localStorageService.setToken(response.token);
    //     this.router.navigate(['/app']);
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
  private _postSignUp() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    this.authService.postSignUp(this.signUpForm.value).subscribe((response) => {
      if (response.ok) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.msg[0],
        });
        timer(1000).subscribe(() => {
          this.router.navigate(['/auth/login']);
        });
      } else {
        console.log()
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: response.msg[0] as
            | string
            | 'The Category could not be created',
        });
      }
    });
  }

  private _initForm() {
    if (this.login) {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, this.vs.validatePat('emailPat')]],
        password: [
          '',
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
