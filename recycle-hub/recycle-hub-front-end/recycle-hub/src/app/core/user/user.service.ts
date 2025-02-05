import { DestroyRef, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '../shared/interface/auth/user-interface';
import { UserState } from '../shared/state/user/reducer';
import { selectUser } from '../shared/state/user/selector';

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
