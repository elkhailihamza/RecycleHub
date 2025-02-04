import { DestroyRef, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UserState } from '../state/user/reducer';
import { Observable } from 'rxjs';
import { User } from '../domain/interface/auth/user-interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { selectUser } from '../state/user/selector';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userState: Observable<User>;

  constructor(private store: Store<UserState>, private destroyRef: DestroyRef) {
    this.userState = this.store.pipe(select(selectUser))
        .pipe(takeUntilDestroyed(this.destroyRef));
  }

  getCurrentUser(): Observable<User> {
    return this.userState;
  }
}
