import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    UserRoutingModule,
  ]
})
export class UserModule { }
