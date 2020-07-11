import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginModule} from './login/login.module';
import {ListModule} from './list/list.module';
import {FormsModule} from './forms/forms.module';
import {DashboardModule} from './dashboard/dashboard.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginModule,
    DashboardModule,
    FormsModule,
    ListModule,
  ],
  exports: [
    LoginModule,
    DashboardModule,
    FormsModule,
    ListModule,
  ]
})
export class PagesModule {
}
