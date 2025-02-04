import { createReducer, on } from "@ngrx/store"
import { clearUser, loginUser } from "./action";
import { login } from "../../domain/interface/auth/login-interface";

export interface UserState {
    user: login
}

const initialState: UserState = {
    user: {
        email: '',
        password: ''
    },
}

export const authReducer = createReducer(
    initialState,
    on(loginUser, (state, { user }) => ({
        ...state,
        user,
    })),
    on(clearUser, () => initialState)
);
