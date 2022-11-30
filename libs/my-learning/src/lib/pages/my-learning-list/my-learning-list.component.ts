import { Component, OnInit } from '@angular/core';
import { selectAllBooks, selectBooksById } from '@frontend/book-base';
import { select, Store } from '@ngrx/store';
import { AlertService, IBook, IItem, ILearning, IOrder } from '@frontend/utils';
import { Observable, take } from 'rxjs';
import { MyLearningService } from '../../services/my-learning.service';
import {
  selectAllMyLearnings,
  selectCountMyLearnings,
} from '../../state/my-learnings.selectors';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'frontend-my-learning-list',
  templateUrl: './my-learning-list.component.html',
})
export class MyLearningListComponent implements OnInit {
  allMyLearnings$!: Observable<ILearning[]>;
  countMyLearnings$!: Observable<number>;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const state = params['state'];

      if (state) {
        if (state === 'success') {
          this.alertService.fire(
            {
              title: 'Your purchased was succesful!!',
              text: 'Enjoy your summarise..',
              icon: 'success',
            },
            {
              urlConfi: '/app/mylearning', // 🔴 TODOOO
              urlCancel: '/app/mylearning',
            }
          );
        } else if (state === 'fail') {
          this.alertService.fire(
            {
              title: 'The payment was unsuccesful!! ',
              text: 'Check your card or try again',
              icon: 'error',
            },
            {
              urlConfi: '/app/mylearning', // 🔴 TODOOO
              urlCancel: '/app/mylearning',
            }
          );
        }
      }
    });
    this.reload();
  }
  reload() {
    this.allMyLearnings$ = this.store.pipe(select(selectAllMyLearnings));
    this.countMyLearnings$ = this.store.pipe(select(selectCountMyLearnings));
  }

  book(id: string): IBook | undefined {
    let data: IBook | undefined;
    this.store
      .pipe(select(selectBooksById(id)), take(1))
      .subscribe((book) => (data = book));

    return data;
  }
}
