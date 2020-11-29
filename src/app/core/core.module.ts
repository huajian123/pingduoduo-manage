import  {APP_INITIALIZER, NgModule, Optional, SkipSelf} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from '../app-routing.module';
import {ServicesModule} from '../services/services.module';
import {PagesModule} from '../pages/pages.module';
import {ShareModule} from '../share/share.module';
import zh from '@angular/common/locales/zh';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd/i18n';
import {throwIfAlreadyLoaded} from './module-import-guard';
import {StartupService} from './startup/startup.service';
import {LayoutModule} from '../layout/layout.module';
import {SimpleReuseStrategy} from '../utils/reuse-strategy';
import {RouteReuseStrategy} from '@angular/router';

registerLocaleData(zh);


export function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}

// 初始化服务
const APPINIT_PROVIDES = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true,
  },
];

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServicesModule,
    PagesModule,
    ShareModule,
    LayoutModule,
    AppRoutingModule,
  ],
  exports: [
    ShareModule,
    AppRoutingModule
  ],
  providers: [{provide: RouteReuseStrategy, useClass: SimpleReuseStrategy}, {provide: NZ_I18N, useValue: zh_CN}, ...APPINIT_PROVIDES, ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
