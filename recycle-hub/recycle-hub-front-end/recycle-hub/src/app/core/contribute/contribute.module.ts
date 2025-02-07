import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestComponent } from './request/request.component';
import { ContributeRoutingModule } from './contribute-routing.module';
import { IndexComponent } from './index/index.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContributeService } from './contribute.service';
import { DbServiceImpl } from '../shared/db/db-impl.service';

@NgModule({
  declarations: [
    RequestComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    ContributeRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    ContributeService,
    DbServiceImpl
  ]
})
export class ContributeModule { }
