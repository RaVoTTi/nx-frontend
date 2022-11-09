import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from '@frontend/user-admin';
import { IUser } from '@frontend/utils';
import { MessageService } from 'primeng/api';
import { take, timer, VirtualTimeScheduler } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService, ValidatorsService } from '@frontend/utils';
@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
})
export class UsersFormComponent implements OnInit {
  form!: FormGroup;
  addressForm!: FormGroup;
  cryptoAddressForm!: FormGroup;

  editMode = false;
  userId = '';

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private errorH: ErrorHandlerService,
    private vs : ValidatorsService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._checkEditMode();
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.editMode) {
      if (this.form.pristine) {
        this.back();
      } else {
        this._putUser(this.userId, this.form.value);
      }
    } else {
      this._postUser(this.form.value);
    }
  }
  private _postUser(user: IUser) {
    this.userService.postUser(user).pipe(take(1)).subscribe((response) => {
      if (response.ok === true) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.msg[0],
        });
        timer(1000).pipe(take(1)).subscribe(() => {
          this.back();
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
  private _putUser(id: string, user: IUser) {
    this.userService.putUser(id, user).pipe(take(1)).subscribe((response) => {
      if (response.ok === true) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.msg[0],
        });
        timer(1000).pipe(take(1)).subscribe(() => {
          this.back();
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
  validateCamp(key: string) {
    return (
      this.form.controls[key].errors && this.form.controls[key].touched
    );
  }
  back() {
    this.location.back();
  }

  _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.userId = params['id'];
        this.userService.getUserById(this.userId).subscribe(({ result }) => {
          this.form.reset({ ...result });
        });
      } else {
        this.editMode = false;
      }
    });
  }

  errorMsg(key: string){
    return this.errorH.errorMsg(this.form.controls[key])
  }
  private _initForm() {


    this.form = this.formBuilder.group(        {
      name: ['', [Validators.required, this.vs.validatePat('namePat')]],
      lastName: ['', [Validators.required, this.vs.validatePat('namePat')]],
      email: ['', [Validators.required, this.vs.validatePat('emailPat')]],
      phone: ['', [Validators.required, this.vs.validatePat('minMaxPat')]],
      password: [
        '',
        [Validators.required, this.vs.validatePat('passwordPat')],
      ],
      state: [true, Validators.required],
      isAdmin: [false, Validators.required],
    }
    
    );
  }
}
