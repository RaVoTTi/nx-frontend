import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';

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
        private localStorageService: LocalStorageService,
    private messageService: MessageService,

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
      this._postLogin();
    } else {
      this._postSignUp();
    }
  }
  private _postLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService.postLogin(this.loginForm.value).subscribe((response) => {
      if (response.token) {
        this.localStorageService.setToken(response.token);
        this.router.navigate(['/app']);
      } else {
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
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
    } else {
      this.signUpForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        phone: ['', [Validators.required, Validators.minLength(8)]],
        name: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
      });
    }
  }

  validateCamp(key: string) {
    if (this.login) {
      return (
        this.loginForm.controls[key].errors &&
        this.loginForm.controls[key].touched
      );
    } else {
      return (
        this.signUpForm.controls[key].errors &&
        this.signUpForm.controls[key].touched
      );
    }
  }
}
