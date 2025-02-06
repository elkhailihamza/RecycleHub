import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestComponent } from './request/request.component';
import { ContributeRoutingModule } from './contribute-routing.module';

@NgModule({
  declarations: [
    RequestComponent
  ],
  imports: [
    CommonModule,
    ContributeRoutingModule,
  ]
})
export class ContributeModule { }
