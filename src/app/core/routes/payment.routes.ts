import { Routes } from '@angular/router';
import { ViewPaymentComponent } from '../../modules/payment/view-payment/view-payment.component';
import { AuthorizedGuard } from 'ng-urxnium';

export const PAYMENT_ROUTING: Routes = [
  {
    path: 'payment',
    loadChildren: () => import('../../modules/payment/payment.module').then(m => m.PaymentModule),
    canActivate: [ AuthorizedGuard ]
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
