import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ViewPeriodComponent } from './view-period/view-period.component';
import { TableDetailComponent } from './table-detail/table-detail.component';
import { TablePaymentComponent } from './table-payment/table-payment.component';
import { ChipDetailComponent } from './chip-detail/chip-detail.component';

@NgModule({
  declarations: [
    ViewPeriodComponent,
    TableDetailComponent,
    TablePaymentComponent,
    ChipDetailComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
