import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeriodRoutingModule } from './period-routing.module';
import { TableMonthComponent } from './table-month/table-month.component';
import { SharedModule } from '../../shared/shared.module';
import { ChipPeriodDetailComponent } from './chip-period-detail/chip-period-detail.component';
import { ViewPeriodComponent } from './view-period/view-period.component';
import { FormPeriodComponent } from './form-period/form-period.component';

@NgModule({
  declarations: [
    TableMonthComponent,
    ChipPeriodDetailComponent,
    ViewPeriodComponent,
    FormPeriodComponent
  ],
  imports: [
    CommonModule,
    PeriodRoutingModule,
    SharedModule
  ]
})
export class PeriodModule { }
