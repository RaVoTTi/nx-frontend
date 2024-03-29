import { Component, OnInit } from '@angular/core';
import { selectAllBooks, selectBooksById } from '@frontend/book-base';
import { select, Store } from '@ngrx/store';
import { IBook, IItem, ILearning, IOrder } from '@frontend/utils';
import { Observable, take } from 'rxjs';
import { MyLearningService } from '../../services/my-learning.service';
import { selectAllMyLearnings, selectCountMyLearnings } from '../../state/my-learnings.selectors';

@Component({
  selector: 'frontend-my-learning-list',
  templateUrl: './my-learning-list.component.html',
})
export class MyLearningListComponent implements OnInit {
  allMyLearnings$!: Observable<ILearning[]>;
  countMyLearnings$!: Observable<number>;

  constructor(
    private store: Store
  ) {}

  ngOnInit(): void {
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
