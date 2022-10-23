import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersState } from './orders.reducer';

import * as fromOrders from './orders.reducer';
import { IItem } from 'interfaces';

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
export const selectAllLearningAsItems = createSelector(
  selectAllOrders,
  (learnings) =>
    learnings.map((order) => {
      return {
      label: order.book.name,
        icon: '📝',
        url: `/app/order/mylearning/${order._id}`
      };
    }) as IItem[]
);


export const areOrdersLoaded = createSelector(
  selectOrdersState,
  state => state.allOrdersLoaded
)