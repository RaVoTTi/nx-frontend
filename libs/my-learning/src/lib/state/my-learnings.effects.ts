import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { create } from 'domain';
import { concatMap, map } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { MyLearningService } from '../services/my-learning.service';
import {
  allMyLearningsLoaded,
  loadAllMyLearnings,
} from './my-learnings.actions';

@Injectable()
export class MyLearningsEffects {
  loadMyLearnings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllMyLearnings),
      concatMap((action) => this.myLearningService.getMyLearnings()),
      map(({result}) => {
        const orders = result ?? [];
        return allMyLearningsLoaded({ orders });
      })
    )
  );
  constructor(
    private actions$: Actions,
    private myLearningService: MyLearningService
  ) {}
}
