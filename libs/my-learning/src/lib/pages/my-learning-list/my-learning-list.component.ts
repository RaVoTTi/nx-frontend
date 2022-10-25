import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IItem, IOrder } from 'interfaces';
import { Observable, take } from 'rxjs';
import { MyLearningService } from '../../services/my-learning.service';
import { selectAllMyLearnings } from '../../state/my-learnings.selectors';

@Component({
  selector: 'frontend-my-learning-list',
  templateUrl: './my-learning-list.component.html',
})
export class MyLearningListComponent implements OnInit {
  allMyLearnings$!: Observable<IOrder[]> ;


  constructor(private myLearningService: MyLearningService, private store: Store) {}

  ngOnInit(): void {

    this.reload()
  }
  reload() {
    this.allMyLearnings$ = this.store.pipe(select(selectAllMyLearnings))

  }
}
