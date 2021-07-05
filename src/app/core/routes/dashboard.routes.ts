import { Routes } from '@angular/router';
import { ViewPeriodComponent } from '../../modules/dashboard/view-period/view-period.component';

export const DASHBOARD_ROUTING: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../modules/dashboard/dashboard.module').then(m => m.DashboardModule),
  }
];

export const DASHBOARD_ROUTING_CHILDREN: Routes = [
  {
    path: '',
    component: ViewPeriodComponent
  }
];
