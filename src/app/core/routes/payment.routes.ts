import { Routes } from '@angular/router';
import { ViewPaymentComponent } from '../../modules/payment/view-payment/view-payment.component';

export const PAYMENT_ROUTING: Routes = [
  {
    path: 'payment',
    loadChildren: () => import('../../modules/payment/payment.module').then(m => m.PaymentModule)
  }
];

export const PAYMENT_ROUTING_CHILDREN: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/period/void'
  },{
    path: ':periodUuid',
    pathMatch: 'full',
    redirectTo: ':periodUuid/void'
  },{
    path: ':periodUuid/:paymentUuid',
    component: ViewPaymentComponent
  }
];
