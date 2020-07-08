import {InjectionToken, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {environment} from '../../environments/environment';

export const API_CONFIG = new InjectionToken('ApiConfigToken');


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {provide: API_CONFIG, useValue: environment.production ? '/' : '/site'}
  ]
})
export class ServicesModule {
}
