import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { WasteComponent } from './waste/waste.component';
import { authGuard } from '../auth/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
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
    path: 'waste',
    component: WasteComponent,
    loadChildren: () => import('./waste/waste.module').then(m => m.WasteModule),
  },
  {
    path: '**',
    redirectTo: 'waste'
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
export class CoreRoutingModule { }
