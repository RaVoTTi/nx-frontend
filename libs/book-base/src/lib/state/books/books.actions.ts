import { createAction, props } from "@ngrx/store";
import { IBook } from "interfaces";

export const loadAllBooks = createAction(
  "[Books Resolver] Load All Books",
)

export const allBooksLoaded = createAction(
  "[Load Books Effect] All Books Loaded",
  props<{books:IBook[]}>()
)

