import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, finalize, first, map, Observable, of, tap } from 'rxjs';
import { loadAllOrders } from '../state/orders.actions';
import { areOrdersLoaded } from '../state/orders.selectors';


@Injectable()
export class OrdersResolver implements Resolve<boolean> {
  loading = false;
  constructor(private store: Store) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {


    return this.store.pipe(
      select(areOrdersLoaded),
      tap((ordersLoaded) => {
        if (!this.loading && !ordersLoaded ) {
          this.loading = true;
          this.store.dispatch(loadAllOrders());
        }
      }),
      filter(ordersLoaded => ordersLoaded),
      first(),
      finalize(()=> this.loading = false)
    );
  }
}
