import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { profileResolver } from './profile/user.resolver';
import { CollectorComponent } from './collector/collector.component';
import { collectorResolver } from './collector/collector.resolver';
import { collectResolver } from './collector/collect/collect.resolver';
import { CollectComponent } from './collector/collect/collect.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    resolve: { user: profileResolver }
  },
  {
    path: 'collector',
    component: CollectorComponent,
    resolve: { requests: collectorResolver }
  },
  {
    path: 'collector/:id',
    component: CollectComponent,
    resolve: { request: collectResolver }
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
export class UserRoutingModule { }
