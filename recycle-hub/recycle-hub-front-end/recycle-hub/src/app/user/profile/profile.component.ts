import { Component, DestroyRef } from '@angular/core';
import { user } from '../../domain/interface/auth/user-interface';
import { Store } from '@ngrx/store';
import { userInitialState, UserState } from '../../state/user/reducer';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: user;

  constructor(private store: Store<UserState>, private destroyRef: DestroyRef, private service: UserService, private ac: ActivatedRoute) {
    this.user = this.ac.snapshot.data['user'];
  }
}
