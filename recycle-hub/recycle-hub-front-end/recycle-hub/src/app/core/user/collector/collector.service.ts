import { Injectable } from '@angular/core';
import { DbServiceImpl } from '../../shared/db/db-impl.service';
import { Router } from '@angular/router';
import { User } from '../../shared/interface/auth/user-interface';
import { Request, requestStatus } from '../../shared/interface/contribute/request-interface';
import { RequestService } from '../../shared/db/db-service/request.service';
import { UserService } from '../../shared/db/db-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class CollectorService {

  constructor(private db: RequestService, private dbUser: UserService, private router: Router) {}

   getRequestById(id: number): Request | null {
    const request = this.db.getById(id);
    if (!request) return null;

    const user = this.dbUser.getById(request.user?.id) as User;
    if (!user) return null;

    return {
        ...request,
        user: user,
    };
  }
  
  changeRequestStatus(data: string, id: number) {
    const req = this.db.getById(id);
    const statusNum: number = Object.keys(requestStatus).slice(5, Object.keys(requestStatus).length).indexOf(data);

    if (req !== null) {
        req.status = statusNum;
        if (statusNum === 3) {
            let points = 0;
            switch(req.recycleMaterial) {
                case 0:
                    points = req.estimatedWeight * 2;
                    break;
                case 1:
                    points = req.estimatedWeight * 1;
                    break;
                case 2:
                    points = req.estimatedWeight * 1;
                    break;
                case 3:
                    points = req.estimatedWeight * 5;
                    break;
                default:
                    points = 0;
            }


            const user = req.user as User;
            user.points = points;
            this.dbUser.update(user, user.id);

            req.user = user;
        }

        this.db.update(req, id);
    }
    this.router.navigate(['/c/user/collector']);
  }
}
