import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MyLearningsState } from './my-learnings.reducer';

import * as fromMyLearning from './my-learnings.reducer';
import { IItem } from 'interfaces';

export const selectMyLearningState = createFeatureSelector<MyLearningsState>('orders');

export const selectAllMyLearnings = createSelector(
  selectMyLearningState,
  fromMyLearning.selectAll
);

export const areMyLearningsLoaded = createSelector(
  selectMyLearningState,
  state => state.allMyLearningsLoaded
)