import { Component, DestroyRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../shared/interface/auth/user-interface';
import { UserState } from '../../shared/state/user/reducer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: User;

  constructor(private store: Store<UserState>, private destroyRef: DestroyRef, private service: UserService, private ac: ActivatedRoute) {
    this.user = this.ac.snapshot.data['user'];
  }
}
