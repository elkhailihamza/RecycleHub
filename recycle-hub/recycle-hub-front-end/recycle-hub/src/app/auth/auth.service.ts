import { DestroyRef, Injectable, signal, WritableSignal } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { User } from '../core/shared/interface/auth/user-interface';
import { UserState } from '../core/shared/state/user/reducer';
import { selectUser } from '../core/shared/state/user/selector';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { clearUser, loginUser } from '../core/shared/state/user/action';
import { login } from '../core/shared/interface/auth/login-interface';
import { register } from '../core/shared/interface/auth/register-interface';
import { role } from '../core/shared/interface/role/role-interface';
import { DbServiceImpl } from '../core/shared/db/db-impl.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSignal: WritableSignal<User | null> = signal(null);

  constructor(private store: Store<UserState>, private destroyRef: DestroyRef, private router: Router, private db: DbServiceImpl<User>) {
    this.store.pipe(select(selectUser))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(usr => {
        if (usr.user.email && usr.user.email !== null) {
          this.userSignal.set(usr);
        }
    });
    this.db.begin('user');
  }

  get user(): WritableSignal<User | null> {
    return this.userSignal;
  }

  register = (data: register) => {
    if (!this.userAlreadyExists(data.email)) {
      const user: User = {id: 0, user: data, role: role.Beneficial, points: 0}
      this.db.insert(user);
      return;
    }
    console.error("user "+ data.email +" already exists!")
  }

  login = (data: login) => {
    if (this.userAlreadyExists(data.email)) {
      const user = this.getUserByEmail(data.email);
      const parsedUser = user as User;
      if (data.password === parsedUser.user.password) {
        this.store.dispatch(loginUser({user: parsedUser}));
        this.router.navigate(["/c/home"]);
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
    return this.db.getEntityWith('user.email', email) !== null;
  }

  private getUserByEmail(email:string) {
    return this.db.getEntityWith('user.email', email);
  }
}
