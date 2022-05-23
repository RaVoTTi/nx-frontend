import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from '@frontend/product';
import { ISubject } from '../../../../../../../interfaces';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-subjects-form',
  templateUrl: './subjects-form.component.html',
})
export class SubjectsFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  subjectId = '';

  constructor(
    private formBuilder: FormBuilder,
    private subjectService: SubjectService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._checkEditMode();
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      state: [true, Validators.required],
      color: ['#ffffff', Validators.required],
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
        this._putSubject(this.subjectId, this.form.value);
      }
    } else {
      this._postSubject(this.form.value);
    }
  }

  validateCamp(key: string) {
    return this.form.controls[key].errors && this.form.controls[key].touched;
  }
  _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.subjectId = params['id'];
        this.subjectService
          .getSubjectById(this.subjectId)
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
  private _putSubject(id: string, subject: ISubject) {
    this.subjectService.putSubject(id, subject).subscribe((response) => {
      if (response.ok === true) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.msg[0],
        });
        timer(1000).subscribe(() => {
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
  private _postSubject(subject: ISubject) {
    this.subjectService.postSubject(subject).subscribe((response) => {
      if (response.ok === true) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.msg[0],
        });
        timer(1000).subscribe(() => {
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
