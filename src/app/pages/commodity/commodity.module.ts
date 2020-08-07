import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommodityRoutingModule } from './commodity-routing.module';
import { CommodityCategoryComponent } from './commodity-categor/commodity-categor.component';
import {ShareModule} from "../../share/share.module";
import {NzUploadModule} from "ng-zorro-antd";


@NgModule({
  declarations: [CommodityCategoryComponent],
    imports: [
        CommonModule,
        CommodityRoutingModule,
        ShareModule,
    ]
})
export class CommodityModule { }
