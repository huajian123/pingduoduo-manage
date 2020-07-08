import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MyCommentModule} from './commponent/my-comment.module';
import {MyNgZorroModule} from './my-ng-zorro/my-ng-zorro.module';
import {RouterModule} from '@angular/router';
import {QuicklinkModule} from 'ngx-quicklink';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyNgZorroModule,
    MyCommentModule,
    QuicklinkModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyNgZorroModule,
    MyCommentModule,
    QuicklinkModule,
    RouterModule,
  ]
})
export class ShareModule {
}
