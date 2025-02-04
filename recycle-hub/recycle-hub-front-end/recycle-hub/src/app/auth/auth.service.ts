import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginUser } from './state/action';
import { register } from '../domain/interface/auth/register-interface';
import { user } from '../domain/interface/auth/user-interface';
import { role } from '../domain/interface/role/role-interface';
import { login } from '../domain/interface/auth/login-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private store: Store) { }

  register = (data: register) => {
    if (this.userAlreadyExists(data.email)) {
      const user: user = {user: data, role: role.Beneficial}
      localStorage.setItem("user: "+data.email, JSON.stringify(user));
      return;
    }
    console.error("user "+ data.email +" already exists!")
  }

  login = (data: login) => {
    if (this.userAlreadyExists(data.email)) {
      const user = this.getUserByEmail(data.email);
      const parsedUser = JSON.parse(user!);
      this.store.dispatch(loginUser(parsedUser));
    }
  }

  private userAlreadyExists(email: string) {
    return localStorage.getItem("user: "+email) === null;
  }

  private getUserByEmail(email:string) {
    return localStorage.getItem("user: "+email);
  }
}
