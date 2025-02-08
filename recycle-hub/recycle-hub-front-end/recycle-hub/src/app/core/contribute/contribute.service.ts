import { Injectable } from '@angular/core';
import { request } from '../shared/interface/contribute/request-interface';
import { DbServiceImpl } from '../shared/db/db-impl.service';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth/auth.service';
import { User } from '../shared/interface/auth/user-interface';

@Injectable({
  providedIn: 'root'
})
export class ContributeService {
  private readonly entityName: string = "request";

  constructor(private db: DbServiceImpl<request>, private auth: AuthService) { 
    this.db.begin(this.entityName);
  }

  storeRequest(data: request): void {
    data.status = 0;
    if (this.db.getEntityWith('dateCollect', data.dateCollect) && this.db.getEntityWith('timeCollect', data.timeCollect)) {
      console.error("Request with date already exists!");
      return;
    }

    const currentUser = this.auth.user() as User;
    const userId = currentUser.id;

    const userRequests = this.db.getItemsWithSameDetail('userId', String(userId));

    const pendingUserRequests = userRequests.filter(req => {
      return req.status === 0;
    })

    if (pendingUserRequests.length > 0) {
      if (pendingUserRequests.length > 3) {
        console.error("This user already has 3 pending requests!");
        return;
      }
  
      const fullWeight = pendingUserRequests.forEach(req => {
        return req.estimatedWeight;
      })
  
      if ((fullWeight! + data.estimatedWeight) > 10000) {
        console.error("Weight surpasses 10Kg on all three pending requests!");
        return;
      }
    }

    data.userId = userId;
    this.db.insert(data);
  }

  getAllRequestsWithSameDetail(detail: string) {
    return this.db.getItemsWithSameDetail('dateCollect', detail);
  }
}
