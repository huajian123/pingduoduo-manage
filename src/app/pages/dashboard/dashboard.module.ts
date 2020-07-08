import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AnalysisPageComponent } from './analysis-page/analysis-page.component';
import { MonitorPageComponent } from './monitor-page/monitor-page.component';
import { WorkbenchPageComponent } from './workbench-page/workbench-page.component';
import {ShareModule} from '../../share/share.module';


@NgModule({
  declarations: [AnalysisPageComponent, MonitorPageComponent, WorkbenchPageComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ShareModule
  ]
})
export class DashboardModule { }
