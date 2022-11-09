import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  AlertService,
  ErrorHandlerService,
  ValidatorsService,
} from '@frontend/utils';

@Component({
  selector: 'frontend-my-settings',
  templateUrl: './my-settings.component.html',
})
export class MySettingsComponent implements OnInit {
  emailForm!: FormControl;
  phoneForm!: FormControl;
  disabled = false

  passwordForm!: FormGroup;

  constructor(
    // private errorH: ErrorHandlerService,
    // private formBuilder: FormBuilder,
    // private vs: ValidatorsService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this._initForm();
  }


  private _initForm() {
    // this.phoneForm = this.formBuilder.control(
    //   '',
    //   [Validators.required, this.vs.validatePat('phone')],
    // );
    // this.emailForm = this.formBuilder.control(
    //   '',
    //   [Validators.required, this.vs.validatePat('emailPath')],
    // );
    // this.passwordForm = this.formBuilder.group(
    //   {
    //     password: [
    //       '',
    //       [Validators.required, this.vs.validatePat('passwordPat')],
    //     ],
    //     password2: ['', [Validators.required]],
    //   },
    //   {
    //     validators: [this.vs.passwordMismatch('password', 'password2')],
    //   }
    // );
  }

  onSubmit() {
    // this.phoneForm.disable();
    // this.emailForm.disable();
    // this.passwordForm.disable();
    this.alert.fire({
      text: 'User changes are unavaible',
      icon: 'error',
    });
  }

  // private _postSettings() {
  //   this.emailForm.markAllAsTouched();
  //   this.phoneForm.markAllAsTouched();
  //   this.passwordForm.markAllAsTouched();
  // }
}
