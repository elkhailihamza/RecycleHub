import { role } from "../role/role-interface";
import { register } from "./register-interface";

export interface user {
    user: register;
    role: role;
}