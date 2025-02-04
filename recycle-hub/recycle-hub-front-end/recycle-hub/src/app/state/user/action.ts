import { createAction, props } from "@ngrx/store";
import { User } from "../../domain/interface/auth/user-interface";

export const loginUser = createAction('[User] Store', props<{ user: User }>());
export const clearUser = createAction('clear');