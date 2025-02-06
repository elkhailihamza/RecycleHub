import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestComponent } from './request/request.component';
import { ContributeRoutingModule } from './contribute-routing.module';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    RequestComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    ContributeRoutingModule,
  ]
})
export class ContributeModule { }
