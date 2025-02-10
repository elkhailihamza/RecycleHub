import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CollectorService } from '../collector.service';
import { Request } from '../../../shared/interface/contribute/request-interface';

export const collectResolver: ResolveFn<Request | null> = (route, state) => {
  const service = inject(CollectorService);
  const router = inject(Router);
  const id = route.paramMap.get('id');

  if (id !== null) {
    const request = service.getRequestById(Number(id));
    if (request !== null) {
      return request;
    }

  }
  return null;
};
