import { createAction, props } from "@ngrx/store";

export const login = createAction(
  "[Auth Page] User Login",
  props<{token: string}>()
)

export const logout = createAction(
  "[Auth Nav Bar] Logout"
)

