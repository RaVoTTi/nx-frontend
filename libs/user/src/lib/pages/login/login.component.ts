import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { environment } from '@env/environment';

@Component({
  selector: 'frontend-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  rawUrl = environment.rawUrl


  constructor(
    private formBuilder: FormBuilder
  ) {
  }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  validateCamp(key: string) {
    return this.form.controls[key].errors && this.form.controls[key].touched;
  }
}
