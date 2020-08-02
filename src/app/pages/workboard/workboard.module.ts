import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkboardRoutingModule } from './workboard-routing.module';
import { HomeComponent } from './home/home.component';
import {ShareModule} from "../../share/share.module";


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    WorkboardRoutingModule,
    ShareModule
  ]
})
export class WorkboardModule { }
