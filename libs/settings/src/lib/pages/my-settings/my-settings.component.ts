import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AlertService,
  ErrorHandlerService,
  ValidatorsService,
} from '@frontend/utils';
import { tap } from 'rxjs';

@Component({
  selector: 'frontend-my-settings',
  templateUrl: './my-settings.component.html',
})
export class MySettingsComponent implements OnInit {
  settingsForm!: FormGroup;

  constructor(
    private errorH: ErrorHandlerService,
    private formBuilder: FormBuilder,
    private vs: ValidatorsService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this._initForm()
  }

  errorMsg(key: string) {
    return this.errorH.errorMsg(this.settingsForm.controls[key]);
  }
  private _initForm() {
    this.settingsForm = this.formBuilder.group(
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
  onSubmit() {
    this.settingsForm.disable();
    this._postSettings();
  }

  private _postSettings() {
    if (this.settingsForm.invalid) {
      this.settingsForm.markAllAsTouched();
      return;
    }
    // this.authBaseService
    //   .postSignUp(this.settingsForm.value)
    //   .pipe(
    //     tap((response) => {
    //       if (response.ok) {
    //         this.alert.fire({
    //           icon: 'success',
    //           text: 'User Created succesful',
    //         });
    //       }
    //     })
    //   )
    //   .subscribe({
    //     error: ({ error }) => {
    //       this.settingsForm.enable();
    //       this.alert.fire({
    //         icon: 'error',
    //         text: error?.msg ? error?.msg : 'Something happened',
    //       });
    //     },
    //   });
  }
}
