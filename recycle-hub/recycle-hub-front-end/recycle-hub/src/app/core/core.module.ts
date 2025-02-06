import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { UserComponent } from './user/user.component';
import { CoreComponent } from './core.component';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from './shared/layout/layout.module';
import { ContributeComponent } from './contribute/contribute.component';

@NgModule({
  declarations: [
    ContributeComponent,
    UserComponent,
    CoreComponent,
    HomeComponent,
  ],
  imports: [
    CoreRoutingModule,
    CommonModule,
    LayoutModule
  ]
})
export class CoreModule { }
