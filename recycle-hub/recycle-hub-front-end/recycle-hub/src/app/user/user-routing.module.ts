import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { profileResolver } from './profile/user.resolver';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    resolve: { user: profileResolver }
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
