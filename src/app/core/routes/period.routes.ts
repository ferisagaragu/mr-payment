import { Routes } from '@angular/router';
import { ViewPeriodComponent } from '../../modules/period/view-period/view-period.component';

export const PERIOD_ROUTING: Routes = [
  {
    path: 'period',
    loadChildren: () => import('../../modules/period/period.module').then(m => m.PeriodModule),
  }
];

export const PERIOD_ROUTING_CHILDREN: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'void'
  },{
    path: ':periodUuid',
    component: ViewPeriodComponent
  }
];
