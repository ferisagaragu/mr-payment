import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PAYMENT_ROUTING_CHILDREN } from '../../core/routes/payment.routes';

const routes: Routes = [
  ...PAYMENT_ROUTING_CHILDREN
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
