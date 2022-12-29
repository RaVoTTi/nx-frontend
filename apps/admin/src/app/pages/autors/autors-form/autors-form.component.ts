import { Component, ErrorHandler, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutorService } from '@frontend/book-admin';
import { IAutor } from '@frontend/utils';
import { MessageService } from 'primeng/api';
import { take, timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '@frontend/utils';

@Component({
  selector: 'admin-autors-form',
  templateUrl: './autors-form.component.html',
})
export class AutorsFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  autorId = '';

  constructor(
    private formBuilder: FormBuilder,
    private autorService: AutorService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
    private errorH: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this._checkEditMode();
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      state: [true, Validators.required],
      urlWiki: ['', Validators.required],
    });
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
        this._putAutor(this.autorId, this.form.value);
      }
    } else {
      this._postAutor(this.form.value);
    }
  }
  errorMsg(key:string){
    return this.errorH.errorMsg(this.form.controls[key])
  }

  validateCamp(key: string) {
    return this.form.controls[key].errors && this.form.controls[key].touched;
  }
  _checkEditMode() {
    this.route.params.pipe(take(1)).subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.autorId = params['id'];
        this.autorService
          .getAutorById(this.autorId)
          .pipe(take(1))
          .subscribe(({ ok, result }) => {
            this.form.reset({ ...result });

            // this.form.controls['name'].setValue(result.name)
            // this.form.controls['icon'].setValue(result.icon)
          });
      } else {
        this.editMode = false;
      }
    });
  }
  back() {
    this.location.back();
  }
  private _putAutor(id: string, autor: IAutor) {
    this.autorService
      .putAutor(id, autor)
      .pipe(take(1))
      .subscribe((response) => {
        if (response.ok === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.msg[0],
          });
          timer(1000)
            .pipe(take(1))
            .subscribe(() => {
              this.back();
            });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Success',
            detail: response.msg[0] as
              | string
              | 'The Category could not be created',
          });
        }
      });
  }
  private _postAutor(autor: IAutor) {
    this.autorService
      .postAutor(autor)
      .pipe(take(1))
      .subscribe((response) => {
        if (response.ok === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.msg[0],
          });
          timer(1000)
            .pipe(take(1))
            .subscribe(() => {
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
}
