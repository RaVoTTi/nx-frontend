// ANGULAR
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
// PRIMENG
import { MessageService } from 'primeng/api';
// import { LocalStorageService } from '../../services/local-storage.service';

// ME
import { AuthBaseService, LocalStorageService } from '@frontend/auth-base';


@Component({
  selector: 'frontend-admin-auth-view',
  templateUrl: './admin-auth-view.component.html'
})
export class AdminAuthViewComponent implements OnInit {
  form!: FormGroup;
  RAW_URL = environment.RAW_URL;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private localStorageService: LocalStorageService,
    private auth: AuthBaseService,
    private router: Router
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
    this.auth.postLoginAdmin(this.form.value).subscribe(
      (response) => {
        if (response.token ) {
          
          this.localStorageService.setToken(response.token)
          this.router.navigate(['/'])

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