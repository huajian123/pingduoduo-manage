import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SearchTableComponent} from './search-table/search-table.component';


const routes: Routes = [
  {path: '', redirectTo: 'search-table', pathMatch: 'full'},
  {path: 'search-table', component: SearchTableComponent, data: {title: '查询表格', keep: true}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule {
}
