import { DestroyRef, Injectable, signal, WritableSignal } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { register } from '../domain/interface/auth/register-interface';
import { User } from '../domain/interface/auth/user-interface';
import { role } from '../domain/interface/role/role-interface';
import { login } from '../domain/interface/auth/login-interface';
import { clearUser, loginUser } from '../state/user/action';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserState } from '../state/user/reducer';
import { Router } from '@angular/router';
import { selectUser } from '../state/user/selector';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSignal: WritableSignal<User | null> = signal(null);

  constructor(private store: Store<UserState>, private destroyRef: DestroyRef, private router: Router) {
    this.store.pipe(select(selectUser))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(usr => {
        if (usr.user.email && usr.user.email !== null) {
          this.userSignal.set(usr);
        }
    });
  }

  get user(): WritableSignal<User | null> {
    return this.userSignal;
  }

  register = (data: register) => {
    if (!this.userAlreadyExists(data.email)) {
      const user: User = {user: data, role: role.Beneficial}
      localStorage.setItem("user: "+data.email, JSON.stringify(user));
      return;
    }
    console.error("user "+ data.email +" already exists!")
  }

  login = (data: login) => {
    if (this.userAlreadyExists(data.email)) {
      const user = this.getUserByEmail(data.email);
      const parsedUser = JSON.parse(user!) as User;
      if (data.password === parsedUser.user.password) {
        this.store.dispatch(loginUser({user: parsedUser}));
        this.router.navigate(["/user/profile"]);
      }
    }
  }

  logout() {
    this.store.dispatch(clearUser());
  }

  isAuthenticated() {
    return this.user() !== null;
  }

  private userAlreadyExists(email: string) {
    return localStorage.getItem("user: "+email) !== null;
  }

  private getUserByEmail(email:string) {
    return localStorage.getItem("user: "+email);
  }
}
