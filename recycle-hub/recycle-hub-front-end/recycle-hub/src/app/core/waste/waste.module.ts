import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestComponent } from './request/request.component';
import { WasteRoutingModule } from './waste-routing.module';

@NgModule({
  declarations: [
    RequestComponent
  ],
  imports: [
    CommonModule,
    WasteRoutingModule,
  ]
})
export class WasteModule { }
