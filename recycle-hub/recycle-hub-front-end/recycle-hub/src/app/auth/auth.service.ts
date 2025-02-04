import { DestroyRef, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { register } from '../domain/interface/auth/register-interface';
import { user } from '../domain/interface/auth/user-interface';
import { role } from '../domain/interface/role/role-interface';
import { login } from '../domain/interface/auth/login-interface';
import { clearUser, loginUser } from '../state/user/action';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserState } from '../state/user/reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private store: Store<UserState>, private destroyRef: DestroyRef) { }

  register = (data: register) => {
    if (!this.userAlreadyExists(data.email)) {
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
      this.store.dispatch(loginUser({user: parsedUser}));
    }
  }

  logout() {
    this.store.pipe(select(clearUser))
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe();
  }

  private userAlreadyExists(email: string) {
    return localStorage.getItem("user: "+email) !== null;
  }

  private getUserByEmail(email:string) {
    return localStorage.getItem("user: "+email);
  }
}
