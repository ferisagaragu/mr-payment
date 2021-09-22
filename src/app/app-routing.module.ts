import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BASE_ROUTES } from './core/routes/base.routes';
import { PERIOD_ROUTING } from './core/routes/period.routes';
import { PAYMENT_ROUTING } from './core/routes/payment.routes';

const routes: Routes = [
  ...BASE_ROUTES,
  ...PERIOD_ROUTING,
  ...PAYMENT_ROUTING
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
