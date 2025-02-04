import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { User } from '../../domain/interface/auth/user-interface';
import { UserService } from '../user.service';

export const profileResolver: ResolveFn<User> = (route, state) => {
  const service = inject(UserService);
  return service.getCurrentUser();
};
