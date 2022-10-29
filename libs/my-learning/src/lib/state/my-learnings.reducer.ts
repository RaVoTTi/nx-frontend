import { state } from '@angular/animations';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import { ILearning } from 'interfaces';
import { allMyLearningsLoaded } from './my-learnings.actions';
// import { login, logout } from './myLearning.actions';

export interface MyLearningsState extends EntityState<ILearning> {
  allMyLearningsLoaded: boolean;
}

export const adapter = createEntityAdapter<ILearning>({
  selectId: (myLearning) => myLearning._id,
});

export const initialMyLearningsState = adapter.getInitialState({});

export const myLearningsReducer = createReducer(
  initialMyLearningsState,

  on(allMyLearningsLoaded, (state, action) =>
    adapter.setAll(action.myLearnings, { ...state, allMyLearningsLoaded: true })
  )
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
