import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Location } from '@angular/common';
import {
  AutorService,
  BookService,
  SubjectService,
} from '@frontend/book-admin';
import { IAutor, IBook, IEvaluation, IOption, ISubject } from 'interfaces';
import { MessageService } from 'primeng/api';
import { take, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';

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

  getEvaluationArray() {
    return this.form.get('evaluation') as FormArray;
  }
  addEvaluation() {
    this.getEvaluationArray().push(
      this.formBuilder.group({
        question: ['', Validators.required],
        correctKey: ['', Validators.required],
        options: this.formBuilder.array([
          this.formBuilder.group({
            option: ['', Validators.required],
            key: ['', Validators.required],
          }),
        ]),
      })
    );
  }
  removeEvaluation(i: number) {
    this.getEvaluationArray().removeAt(i);
  }
  addOption(i: number) {
    this.getOptionArray(i).push(
      this.formBuilder.group({
        option: ['', Validators.required],
        key: ['', Validators.required],
      })
    );
  }
  removeOption(i: number, y: number) {
    this.getOptionArray(i).removeAt(y);
  }
  getEvaluation(i: number) {
    return this.getEvaluationArray().controls[i] as FormGroup;
  }
  getCorrectKey(i: number) {
    return this.getEvaluation(i).get('correctKey') as FormControl;
  }
  getQuestion(i: number) {
    return this.getEvaluation(i).get('question') as FormControl;
  }
  getOptionArray(i: number) {
    return this.getEvaluation(i).get('options') as FormArray;
  }
  getOptionGroup(i: number, y: number) {
    return this.getOptionArray(i).controls[y] as FormGroup;
  }
  getOption(i: number, y: number) {
    return this.getOptionGroup(i, y).get('option') as FormControl;
  }
  getKey(i: number, y: number) {
    return this.getOptionGroup(i, y).get('key') as FormControl;
  }

  private _postBook(book: FormData) {
    this.bookService
      .postBook(book)
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
  private _putBook(id: string, book: FormData) {
    this.bookService
      .putBook(id, book)
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
  validateCamp(key: string) {
    return this.form.controls[key].errors && this.form.controls[key].touched;
  }
  back() {
    this.location.back();
  }
  private _getSubjects() {
    this.subjectService
      .getSubjects()
      .pipe(take(1))
      .subscribe(({ result }) => {
        this.subjects = result ? result : [];
      });
  }
  private _getAutors() {
    this.autorService
      .getAutors()
      .pipe(take(1))
      .subscribe(({ result }) => {
        this.autors = result ? result : [];
      });
  }
  _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.bookId = params['id'];
        this.bookService
          .getBookByIdAdmin(this.bookId)
          .pipe(take(1))
          .subscribe(({ result }) => {
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
      evaluation: this.formBuilder.array([
        this.formBuilder.group({
          question: [
            'Valentin',
            [Validators.required, Validators.minLength(5)],
          ],
          correctKey: [
            'V',
            [
              Validators.required,
              Validators.maxLength(1),
              Validators.minLength(1),
            ],
          ],

          options: this.formBuilder.array([
            this.formBuilder.group({
              option: ['es un crack', Validators.required],
              key: ['c', [Validators.required]],
            }),
            this.formBuilder.group({
              option: ['es un huevon', Validators.required],
              key: ['h', [Validators.required]],
            }),
          ]),
        }),
        this.formBuilder.group({
          question: ['', [Validators.required, Validators.minLength(5)]],
          correctKey: [
            '',
            [
              Validators.required,
              Validators.maxLength(1),
              Validators.minLength(1),
            ],
          ],

          options: this.formBuilder.array([
            this.formBuilder.group({
              option: ['', Validators.required],
              key: [null, [Validators.required]],
            }),
          ]),
        }),
      ]),
      content: ['', [Validators.required, Validators.minLength(20)]],
      image: [''],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    console.log('paso');
    const bookFormData = new FormData();

    Object.keys(this.form.value).map((key) => {
      if (key === 'evaluation') {
        const evaluations: IEvaluation[] =
          this.getEvaluationArray().controls.map((test, index) => {
            return {
              question: test.get('question')?.value,
              correctKey: test.get('correctKey')?.value,
              options: this.getOptionsJSON(index),
            } as IEvaluation;
          });
        bookFormData.append(key, JSON.stringify(evaluations));
      } else {
        bookFormData.append(key, this.form.value[key]);
      }
    });
    this._postBook(bookFormData);
  }

  getOptionsJSON(i: number): IOption[] {
    return this.getOptionArray(i).controls.map((element, index) => {
      return {
        key: this.getKey(i, index).value,
        option: this.getOption(i, index).value,
      } as IOption;
    }) as IOption[];
  }

  onImageUpload(event: any) {
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
