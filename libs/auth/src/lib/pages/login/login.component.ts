// ANGULAR
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@env/environment';
// PRIMENG
import { MessageService } from 'primeng/api';

// ME
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'frontend-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  rawUrl = environment.rawUrl;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,

    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }
  validateCamp(key: string) {
    return this.form.controls[key].errors && this.form.controls[key].touched;
  }
  private _initLoginForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.auth.postLogin(this.form.value).subscribe(
      (response) => {
        if (response.ok === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.msg[0],
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
      },
      (error: HttpErrorResponse) => {

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Server error ${error.status}`,
        });
      }
    );
  }
}
