import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { Location } from '@angular/common';
import { IBook, IEvaluation, IOption, IOrder } from 'interfaces';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MyLearningService } from '../../services/my-learning.service';

@Component({
  selector: 'frontend-my-evaluation-view',
  templateUrl: './my-evaluation-view.component.html',
})
export class MyEvaluationViewComponent implements OnInit {
  orderId!: string;
  book!: IBook;
  evaluationForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private myLearningService: MyLearningService,
    private formBuilder: FormBuilder,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.evaluationForm = this.formBuilder.group({
      evaluation: this.formBuilder.array([]),
    });
    console.log();
    this.route.params.pipe(take(1)).subscribe((params) => {
      if (params['id']) {
        this.orderId = params['id'];
        // this.myLearningService
        //   .getEvaluationById(this.orderId)
        //   .pipe(take(1))
        //   .subscribe(({ result }) => {
        //     if (result?.book) {
        //       this.book = result.book;
        //       console.log(this.book.evaluation)
        //       this.book.evaluation?.forEach((test) => {
        //         this.getEvaluationArrayForm().push(
        //           new FormControl(null, [
        //             Validators.required,
        //             Validators.pattern(test.correctKey),
        //           ])
        //         );
        //       });
        //     }
        //   });
      }
    });
  }

  onSubmit() {
    if (this.evaluationForm.invalid) {
      this.back();
    } else {
      // this.myLearningService
      //   .getEvaluationConfirm(this.orderId)
      //   .pipe(take(1))
      //   .subscribe((response) => {
      //     if (response.ok) {
      //       this.router.navigate([`app/order/thanks/evaluation`]);
      //     }
      //   });
    }
  }

  getQuestion(i: number) {
    return this.getEvaluationArray()[i].question;
  }
  getOptionArray(i: number) {
    return this.getEvaluationArray()[i].options as IOption[];
  }
  getOption(i: number, y: number) {
    return this.getOptionArray(i)[y].option;
  }
  getKey(i: number, y: number) {
    return this.getOptionArray(i)[y].key;
  }
  getEvaluationArray() {
    return this.book.evaluation as IEvaluation[];
  }

  getEvaluationArrayForm() {
    return this.evaluationForm.get('evaluation') as FormArray;
  }
  getOptionArrayForm(i: number) {
    return this.getEvaluationArrayForm().controls[i] as FormControl;
  }

  back() {
    this.location.back();
  }
}
