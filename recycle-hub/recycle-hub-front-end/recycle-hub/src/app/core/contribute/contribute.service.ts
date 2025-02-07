import { Injectable } from '@angular/core';
import { request } from '../shared/interface/contribute/request-interface';
import { DbServiceImpl } from '../shared/db/db-impl.service';

@Injectable({
  providedIn: 'root'
})
export class ContributeService {
  private readonly entityName: string = "request";

  constructor(private db: DbServiceImpl<request>) { 
    this.db.begin(this.entityName);
  }

  storeRequest(data: request): void {
    this.db.insert(data);
  }

  getAllRequestsWithSameDetail(detail: string) {
    return this.db.getItemsWithSameDetail('dateCollect', detail);
  }
}
