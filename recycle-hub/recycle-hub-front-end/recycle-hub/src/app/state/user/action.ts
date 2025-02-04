import { createAction, props } from "@ngrx/store";
import { user } from "../../domain/interface/auth/user-interface";

export const loginUser = createAction('[User] Store', props<{ user: user }>());
export const clearUser = createAction('clear');