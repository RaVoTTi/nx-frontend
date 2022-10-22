import { createAction, props } from "@ngrx/store";
import { IBook, IOrder } from "interfaces";

export const loadAllOrders = createAction(
  "[Orders Resolver] Load All Orders",
)

export const allOrdersLoaded = createAction(
  "[Load Orders Effect] All Orders Loaded",
  props<{orders:IOrder[]}>()
)

