import { createAction, props } from "@ngrx/store";
import { login } from "../../domain/interface/auth/login-interface";

export const loginUser = createAction('[User] Store', props<{ user: login }>());
export const clearUser = createAction('clear');