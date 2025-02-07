import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { authGuard } from '../auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { ContributeComponent } from './contribute/contribute.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserComponent,
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [authGuard]
  },
  {
    path: 'contribute',
    component: ContributeComponent,
    loadChildren: () => import('./contribute/contribute.module').then(m => m.ContributeModule),
  },
  {
    path: '**',
    redirectTo: 'home'
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CoreRoutingModule { }
