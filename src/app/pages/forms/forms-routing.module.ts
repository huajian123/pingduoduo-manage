import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BasisFormsComponent} from './basis-forms/basis-forms.component';
import {StepsFormsComponent} from './steps-forms/steps-forms.component';
import {AdvancedFormsComponent} from './advanced-forms/advanced-forms.component';


const routes: Routes = [
  {path: '', redirectTo: 'basis-forms', pathMatch: 'full'},
  {path: 'basis-forms', component: BasisFormsComponent, data: {title: '基础表单', keep: true}},
  {path: 'steps-forms', component: StepsFormsComponent, data: {title: '分步表单', keep: true}},
  {path: 'advanced-forms', component: AdvancedFormsComponent, data: {title: '高级表单', keep: true}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule {
}
