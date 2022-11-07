import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MyLearningsState } from './my-learnings.reducer';

import * as fromMyLearnings from './my-learnings.reducer';
import { IItem } from 'interfaces';
import { booksReducer } from '@frontend/book-base';

export const selectMyLearningsState =
  createFeatureSelector<MyLearningsState>('myLearnings');

export const selectAllMyLearnings = createSelector(
  selectMyLearningsState,
  fromMyLearnings.selectAll
);
export const selectCountMyLearnings = createSelector(
  selectAllMyLearnings,
  (books) => books.length
);


export const areMyLearningsLoaded = createSelector(
  selectMyLearningsState,
  (state) => state.allMyLearningsLoaded
);
export const selectMyLearningsEntities = createSelector(
  selectMyLearningsState,
  fromMyLearnings.selectEntities 
);

export const selectMyLearningById = (id: string) =>
  createSelector(selectMyLearningsEntities, (learnings) =>
    learnings[id]
  );