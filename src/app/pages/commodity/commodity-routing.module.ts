import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommodityCategoryComponent} from "./commodity-categor/commodity-categor.component";


const routes: Routes = [
  {path: '', redirectTo: 'commodity-category', pathMatch: 'full'},
  {path: 'commodity-category', component: CommodityCategoryComponent, data: {title: '商品种类', keep: true}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommodityRoutingModule { }
