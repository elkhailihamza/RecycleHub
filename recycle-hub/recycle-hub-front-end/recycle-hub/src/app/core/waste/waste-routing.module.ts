import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestComponent } from './request/request.component';
import { WasteComponent } from './waste.component';

const routes: Routes = [
  {
    path: '',
    component: WasteComponent
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
export class WasteRoutingModule { }
