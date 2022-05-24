import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from '@frontend/user-admin';
import { IUser } from 'interfaces';
import { MessageService } from 'primeng/api';
import { take, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
})
export class UsersFormComponent implements OnInit {
  userForm!: FormGroup;
  addressForm!: FormGroup;
  cryptoAddressForm!: FormGroup;

  editMode = false;
  userId = '';

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private route: ActivatedRoute,

    private formBuilder: FormBuilder,
    private location: Location
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._checkEditMode();
  }
  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    if (this.editMode) {
      if (this.userForm.pristine) {
        this.back();
      } else {
        this._putUser(this.userId, this.userForm.value);
      }
    } else {
      this._postUser(this.userForm.value);
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
      this.userForm.controls[key].errors && this.userForm.controls[key].touched
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
          this.userForm.reset({ ...result });
        });
      } else {
        this.editMode = false;
      }
    });
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
}
