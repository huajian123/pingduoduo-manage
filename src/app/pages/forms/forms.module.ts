import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { BasisFormsComponent } from './basis-forms/basis-forms.component';
import { StepsFormsComponent } from './steps-forms/steps-forms.component';
import { AdvancedFormsComponent } from './advanced-forms/advanced-forms.component';
import {ShareModule} from '../../share/share.module';


@NgModule({
  declarations: [BasisFormsComponent, StepsFormsComponent, AdvancedFormsComponent],
    imports: [
        CommonModule,
        FormsRoutingModule,
        ShareModule,
    ]
})
export class FormsModule { }
