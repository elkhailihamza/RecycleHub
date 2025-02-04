import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { user } from '../../domain/interface/auth/user-interface';
import { UserService } from '../user.service';

export const profileResolver: ResolveFn<user> = (route, state) => {
  const service = inject(UserService);
  return service.getCurrentUser();
};
