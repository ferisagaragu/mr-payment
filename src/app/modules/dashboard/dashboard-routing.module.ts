import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DASHBOARD_ROUTING_CHILDREN } from '../../core/routes/dashboard.routes';

const routes: Routes = [
  ...DASHBOARD_ROUTING_CHILDREN
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
