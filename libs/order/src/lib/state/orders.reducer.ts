import { state } from '@angular/animations';
import { initialAuthState } from '@frontend/auth-base';
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
import { IOrder } from 'interfaces';
import { allOrdersLoaded } from './orders.actions';
// import { login, logout } from './order.actions';

export interface OrdersState extends EntityState<IOrder> {
  allOrdersLoaded: boolean;
}



export const adapter = createEntityAdapter<IOrder>({
  selectId: order => order._id
});

export const initialOrdersState = adapter.getInitialState({
  
});

export const ordersReducer = createReducer(
  initialOrdersState,

  on(allOrdersLoaded, (state, action) => adapter.setAll(action.orders, {...state, allOrdersLoaded:true}))
 
);

export const {
selectAll,
selectEntities,
selectIds,
selectTotal

} = adapter.getSelectors()