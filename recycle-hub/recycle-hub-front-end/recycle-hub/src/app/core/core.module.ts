import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { WasteComponent } from './waste/waste.component';
import { UserComponent } from './user/user.component';
import { NavbarComponent } from './shared/layout/navbar/navbar.component';
import { CoreComponent } from './core.component';
import { HeaderComponent } from './shared/layout/home/header/header.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    WasteComponent,
    UserComponent,
    NavbarComponent,
    CoreComponent,
    HomeComponent,
    HeaderComponent,
  ],
  imports: [
    CoreRoutingModule,
    CommonModule,
  ]
})
export class CoreModule { }
