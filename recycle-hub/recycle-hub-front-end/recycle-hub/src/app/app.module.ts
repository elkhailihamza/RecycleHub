import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { StoreModule } from '@ngrx/store';
import { UserComponent } from './user/user.component';
import { userReducer } from './state/user/reducer';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({user: userReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
