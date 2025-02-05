import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../../shared/interface/auth/user-interface';

export const profileResolver: ResolveFn<User> = (route, state) => {
  const service = inject(UserService);
  return service.getCurrentUser();
};
