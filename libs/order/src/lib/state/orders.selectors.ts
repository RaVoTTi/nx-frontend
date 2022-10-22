import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersState } from './orders.reducer';

import * as fromOrders from './orders.reducer';

export const selectOrdersState = createFeatureSelector<OrdersState>('orders');

export const selectAllOrders = createSelector(
  selectOrdersState,
  fromOrders.selectAll
);

// export const selectSearchOrders = ( word : string) => createSelector(
//   selectAllOrders,
//   orders => orders.filter(book => book.name.search(word))
// );

// export const selectLiteratureOrders =  createSelector(
//   selectAllOrders,
//   (orders, ) => orders.filter(book => book.subject.name === 'LITERATURE')
// );
export const selectWishOrders = ( wish : string[]) =>  createSelector(
  selectAllOrders,
  (orders, ) => orders.filter( book => wish.includes(book._id)));
export const areOrdersLoaded = createSelector(
  selectOrdersState,
  state => state.allOrdersLoaded
)