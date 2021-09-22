import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PERIOD_ROUTING_CHILDREN } from '../../core/routes/period.routes';

const routes: Routes = [
  ...PERIOD_ROUTING_CHILDREN
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodRoutingModule { }
