import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { ViewPaymentComponent } from './view-payment/view-payment.component';
import { TablePaymentComponent } from './table-payment/table-payment.component';
import { FormPaymentComponent } from './form-payment/form-payment.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ViewPaymentComponent,
    TablePaymentComponent,
    FormPaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule
  ]
})
export class PaymentModule { }
