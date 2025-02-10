import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ContributeService } from '../../contribute/contribute.service';
import { Request } from '../../shared/interface/contribute/request-interface';

export const collectorResolver: ResolveFn<Request[]> = (route, state) => {
  const service = inject(ContributeService);
  return service.getAllRequests();
};
