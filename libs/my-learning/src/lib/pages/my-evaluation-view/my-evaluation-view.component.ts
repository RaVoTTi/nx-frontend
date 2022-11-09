import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { Location } from '@angular/common';
import { IBook, IEvaluation, ILearning, IOption, IOrder } from '@frontend/utils';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MyLearningService } from '../../services/my-learning.service';
import { AlertService } from '@frontend/utils';
import { select, Store } from '@ngrx/store';
import { selectMyLearningById } from '../../state/my-learnings.selectors';

@Component({
  selector: 'frontend-my-evaluation-view',
  templateUrl: './my-evaluation-view.component.html',
})
export class MyEvaluationViewComponent implements OnInit {
  learning!: ILearning;
  evaluationForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private alert: AlertService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.evaluationForm = this.formBuilder.group({
      evaluation: this.formBuilder.array([]),
    });
    this.route.params.pipe(take(1)).subscribe((params) => {
      if (params['id']) {
        this.store
          .pipe(select(selectMyLearningById(params['id'])))
          .subscribe((learning) => {
            if (learning) {
              this.learning = learning;
              this.learning.book.evaluation.forEach((test) => {
                this.getEvaluationArrayForm().push(
                  new FormControl(null, [
                    Validators.required,
                    Validators.pattern(test.correctKey),
                  ])
                );
              });
            } else {
              this.router.navigate(['/app/mylearning']);
            }
          });
      } else {
        this.router.navigate(['/app/mylearning']);
      }
    });
    // this.myLearningService
    //   .getEvaluationById(this.orderId)
    //   .pipe(take(1))
    //   .subscribe(({ result }) => {
    //     if (result?.book) {
    //       this.book = result.book;
    //       console.log(this.book.evaluation)
    //     }
    //   });
  }

  onSubmit() {
    if (this.evaluationForm.invalid) {
      this.alert.fire(
        {
          text: 'The answers are incorrect',
          icon: 'error',
        },
        {
          urlConfi: `/app/mylearning/${this.learning._id}`,
          urlCancel: `/app/mylearning/${this.learning._id}`,
        }
      );
    } else {
      this.alert.fire(
        {
          text: 'Congratulations',
          icon: 'error',
        },
        {
          urlConfi: `/app/mylearning/${this.learning._id}`,
          urlCancel: `/app/mylearning/${this.learning._id}`,
        }
      );
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
    return this.learning.book.evaluation as IEvaluation[];
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
