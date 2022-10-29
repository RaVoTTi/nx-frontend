import { createAction, props } from "@ngrx/store";
import { IBook, ILearning, IOrder } from "interfaces";

export const loadAllMyLearnings = createAction(
  "[Learnings Resolver] Load All Learnings",
)

export const allMyLearningsLoaded = createAction(
  "[Load Learnings Effect] All Learnings Loaded",
  props<{myLearnings:ILearning[]}>()
)

