import { createReducer, on } from "@ngrx/store"
import { clearUser, loginUser } from "./action";
import { User } from "../../domain/interface/auth/user-interface";

export interface UserState {
    user: User
}

export const userInitialState: UserState = {
    user: {
        user: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            homeAddress: '',
            phoneNumber: '',
            dateOfBirth: '',
            profilePicture: '',
        },
        role: 0,
    }
}

export const userReducer = createReducer(
    userInitialState,
    on(loginUser, (_, { user }) => ({
        user: user,
    })),
    on(clearUser, () => userInitialState)
);
