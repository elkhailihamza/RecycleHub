import { role } from "../role/role-interface";
import { register } from "./register-interface";

export interface User {
    id: number;
    user: register;
    role: role;
}