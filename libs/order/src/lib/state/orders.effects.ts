import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { create } from 'domain';
import { concatMap, map } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { OrderService } from '../services/order.service';
import {
  allOrdersLoaded,
  loadAllOrders,
} from './orders.actions';

@Injectable()
export class OrdersEffects {
  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllOrders),
      concatMap((action) => this.orderService.getMyOrders(1)),
      map(({result}) => {
        const orders = result ?? [];
        return allOrdersLoaded({ orders });
      })
    )
  );
  constructor(
    private actions$: Actions,
    private orderService: OrderService
  ) {}
}
