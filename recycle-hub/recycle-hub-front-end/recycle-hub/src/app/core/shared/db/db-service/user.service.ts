import { Injectable } from '@angular/core';
import { DbServiceImpl } from '../db-impl.service';
import { User } from '../../interface/auth/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DbServiceImpl<User>{

  constructor() { 
    super();
    this.begin("user");
  }
}
