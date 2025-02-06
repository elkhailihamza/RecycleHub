import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestComponent } from './request/request.component';
import { ContributeComponent } from './contribute.component';

const routes: Routes = [
  {
    path: '',
    component: ContributeComponent
  },
  {
    path: 'request',
    component: RequestComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ContributeRoutingModule { }
