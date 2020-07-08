import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginRoutingModule} from './login-routing.module';
import {ShareModule} from '../../share/share.module';
import {LoginLayoutComponent} from './login-layout/login-layout.component';


@NgModule({
  declarations: [LoginLayoutComponent],
  imports: [
    CommonModule,
    ShareModule,
    LoginRoutingModule,
  ]
})
export class LoginModule {
}
