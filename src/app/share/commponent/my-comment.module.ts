import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopProgressBarComponent} from './top-progress-bar/top-progress-bar.component';
import {CardTableWrapComponent} from './card-table-wrap/card-table-wrap.component';
import {MyNgZorroModule} from '../my-ng-zorro/my-ng-zorro.module';
import {AntTableComponent} from './ant-table/ant-table.component';


@NgModule({
  declarations: [
    TopProgressBarComponent,
    CardTableWrapComponent,
    AntTableComponent
  ],
  imports: [
    CommonModule,
    MyNgZorroModule
  ],
  exports: [
    TopProgressBarComponent,
    CardTableWrapComponent,
    AntTableComponent
  ]
})
export class MyCommentModule {
}
