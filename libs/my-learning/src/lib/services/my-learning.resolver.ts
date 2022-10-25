import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, finalize, first, map, Observable, of, tap } from 'rxjs';
import { loadAllMyLearnings } from '../state/my-learnings.actions';
import { areMyLearningsLoaded } from '../state/my-learnings.selectors';


@Injectable()
export class MyLearningResolver implements Resolve<boolean> {
  loading = false;
  constructor(private store: Store) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {


    return this.store.pipe(
      select(areMyLearningsLoaded),
      tap((myLearningsLoaded) => {
        if (!this.loading && !myLearningsLoaded ) {
          this.loading = true;
          this.store.dispatch(loadAllMyLearnings());
        }
      }),
      filter(myLearningsLoaded => myLearningsLoaded),
      first(),
      finalize(()=> this.loading = false)
    );
  }
}
