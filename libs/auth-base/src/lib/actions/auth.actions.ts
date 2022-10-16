import { createAction, props } from "@ngrx/store";
import { IAuth } from "../interfaces/IAuth";

export const login = createAction(
  "[Auth Page] User Login",
  props<{user: IAuth}>()
)

export const logout = createAction(
  "[Auth Nav Bar] Logout"
)

