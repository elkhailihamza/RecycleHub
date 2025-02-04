import { role } from "../role/role-interface";
import { register } from "./register-interface";

export interface User {
    user: register;
    role: role;
}