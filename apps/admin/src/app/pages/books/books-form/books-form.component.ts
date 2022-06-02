import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AutorService, BookService, SubjectService } from '@frontend/product';
import { IAutor, IBook, ISubject } from 'interfaces';
import { MessageService } from 'primeng/api';
import { take, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-books-form',
  templateUrl: './books-form.component.html',
})
export class BooksFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  bookId = '';
  subjects: ISubject[] = [];
  autors: IAutor[] = [];
  imageDisplay: string | ArrayBuffer = '';

  constructor(
    private subjectService: SubjectService,
    private autorService: AutorService,
    private bookService: BookService,
    private messageService: MessageService,
    private route: ActivatedRoute,

    private formBuilder: FormBuilder,
    private location: Location
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._checkEditMode();
    this._getSubjects();
    this._getAutors();
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const bookFormData = new FormData();

    Object.keys(this.form.value).map((key) => {
      bookFormData.append(key, this.form.value[key]);
    });
    if (this.editMode) {
      if (this.form.pristine) {
        this.back();
      } else {
        this._putBook(this.bookId, bookFormData);
      }
    } else {
      this._postBook(bookFormData);
    }
  }
  private _postBook(book: FormData) {
    this.bookService.postBook(book).pipe(take(1)).subscribe((response) => {
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
  private _putBook(id: string, book: FormData) {
    this.bookService.putBook(id, book).pipe(take(1)).subscribe((response) => {
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
    return this.form.controls[key].errors && this.form.controls[key].touched;
  }
  back() {
    this.location.back();
  }
  private _getSubjects() {
    this.subjectService.getSubjects().pipe(take(1)).subscribe(({ result }) => {
      this.subjects = result ? result : [];
    });
  }
  private _getAutors() {
    this.autorService.getAutors().pipe(take(1)).subscribe(({ result }) => {
      this.autors = result ? result : [];
    });
  }
  _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.bookId = params['id'];
        this.bookService.getBookByIdAdmin(this.bookId).pipe(take(1)).subscribe(({ result }) => {
          this.form.reset({ ...result });
        });
      } else {
        this.editMode = false;
      }
    });
  }
  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      minPrice: [0, Validators.required],
      maxPrice: [0, Validators.required],

      state: [true, Validators.required],
      isFeatured: [false, Validators.required],
      autor: ['', Validators.required],
      subject: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      // evaluation: ['', Validators.required],
      // content: ['', Validators.required],
      image: [''],
    });
  }
  onImageUpload(event: any) {
    // console.log(event)

    const file = event.target.files[0];

    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();

      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result ? fileReader.result : '';
      };
      fileReader.readAsDataURL(file);
    }
  }
}
