import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AnalysisPageComponent} from './analysis-page/analysis-page.component';
import {MonitorPageComponent} from './monitor-page/monitor-page.component';
import {WorkbenchPageComponent} from './workbench-page/workbench-page.component';


const routes: Routes = [
  {path: '', redirectTo: 'analysis', pathMatch: 'full'},
  {path: 'analysis', component: AnalysisPageComponent, data: {title: '分析页', keep: true}},
  {path: 'monitor', component: MonitorPageComponent, data: {title: '监控页', keep: true}},
  {path: 'workbench', component: WorkbenchPageComponent, data: {title: '工作台', keep: true}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
