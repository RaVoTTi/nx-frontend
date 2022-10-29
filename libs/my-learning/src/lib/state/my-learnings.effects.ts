import { Injectable } from '@angular/core';
import { selectBooksById } from '@frontend/book-base';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { create } from 'domain';
import { IBook, ILearning } from 'interfaces';
import { concatMap, map, take } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { MyLearningService } from '../services/my-learning.service';
import {
  allMyLearningsLoaded,
  loadAllMyLearnings,
} from './my-learnings.actions';

@Injectable()
export class MyLearningsEffects {
  loadMyLearnings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllMyLearnings),
      concatMap((action) => this.myLearningService.getMyLearnings()),
      map(({ result }) => {
        if (result) {
          result.map(({ book: oldBook, ...rest }) => {
            this.store
              .pipe(select(selectBooksById(oldBook._id)), take(1))
              .subscribe((storeBook) => {
                if (storeBook) {
                  // console.log(oldBook)
                  // console.log(storeBook)
                  console.log(this.joinBooks(oldBook, storeBook));
                  return this.joinBooks(oldBook, storeBook);
                } else {
                  return {};
                }

                // const book = this.joinBooks(oldBook, storeBook);
              });

            return {
              ...rest,
            };
          });
        }

        const myLearnings = result ?? [];
        return allMyLearningsLoaded({ myLearnings });
      })
    )
  );
  joinBooks(oldBook: IBook, storeBook: IBook): IBook {
    const { content = '', evaluation = [] } = oldBook;
    const {
      _id,
      autor,
      subject,
      name,
      state,
      isFeatured,
      image,
      minPrice,
      maxPrice,
      dateCreated,
      description,
    } = storeBook;

    // return Object.assign({}, oldBook, storeBook);
    return {
      content,
      evaluation,
      _id,
      autor,
      subject,
      name,
      state,
      isFeatured,
      image,
      minPrice,
      maxPrice,
      dateCreated,
      description,
    };
  }
  constructor(
    private store: Store,

    private actions$: Actions,
    private myLearningService: MyLearningService
  ) {}
}
