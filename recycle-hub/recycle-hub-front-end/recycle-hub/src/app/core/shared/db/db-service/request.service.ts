import { Injectable } from '@angular/core';
import { DbServiceImpl } from '../db-impl.service';
import { Request } from '../../interface/contribute/request-interface';

@Injectable({
  providedIn: 'root'
})
export class RequestService extends DbServiceImpl<Request>{

  constructor() { 
    super();
    this.begin("request");
  }
}
