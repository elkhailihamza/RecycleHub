import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { CollectorComponent } from './collector/collector.component';
import { CommonModule } from '@angular/common';
import { CollectComponent } from './collector/collect/collect.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CollectorService } from './collector/collector.service';
import { DbServiceImpl } from '../shared/db/db-impl.service';

@NgModule({
  declarations: [
    ProfileComponent,
    CollectorComponent,
    CollectComponent,
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    CollectorService,
    DbServiceImpl
  ]
})
export class UserModule { }
