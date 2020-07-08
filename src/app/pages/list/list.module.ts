import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { SearchTableComponent } from './search-table/search-table.component';
import {ShareModule} from '../../share/share.module';


@NgModule({
  declarations: [SearchTableComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    ShareModule
  ]
})
export class ListModule { }
