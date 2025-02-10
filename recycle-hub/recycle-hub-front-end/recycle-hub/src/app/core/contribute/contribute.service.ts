import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Request, requestStatus } from '../shared/interface/contribute/request-interface';
import { RequestService } from '../shared/db/db-service/request.service';
import { UserService } from '../shared/db/db-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class ContributeService {

  constructor(private db: RequestService, private dbUser: UserService, private auth: AuthService, private router: Router) { }

  storeRequest(data: Request): void {
    if (this.db.getEntityWith('dateCollect', data.dateCollect) && this.db.getEntityWith('timeCollect', data.timeCollect)) {
      console.error("Request with date already exists!");
      return;
    }

    // const currentUser = this.auth.user() as User;
    // const userId = 0; change to currentUser.id when completing project because state management sucks for auth
    const userRequests = this.db.getEntitiesWith('user.id', String(0)); // change to userId

    if (this.db.getAll.length > 0 && userRequests && userRequests.length > 0) {

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
    }
    
    data.status = requestStatus.pending;
    data.user = this.dbUser.getById(1)!;
    this.db.insert(data);
    this.router.navigate(['/c/contribute']);
  }

  getAllRequestsWithSameDetail(detail: string) {
    return this.db.getItemsWithSameDetail('dateCollect', detail);
  }

  getAllRequests(): Request[] {
    return this.db.getAll;
  }
}
