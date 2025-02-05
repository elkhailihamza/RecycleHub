import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { WasteComponent } from './waste/waste.component';
import { UserComponent } from './user/user.component';
import { NavbarComponent } from './shared/layout/layout/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CoreComponent } from './core.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    WasteComponent,
    UserComponent,
    NavbarComponent,
    CoreComponent,
    HomeComponent
  ],
  imports: [
    CoreRoutingModule,
    CommonModule,
  ]
})
export class CoreModule { }
