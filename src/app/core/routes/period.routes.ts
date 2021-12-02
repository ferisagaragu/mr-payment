import { Routes } from '@angular/router';
import { ViewPeriodComponent } from '../../modules/period/view-period/view-period.component';
import { AuthorizedGuard } from 'ng-urxnium';

export const PERIOD_ROUTING: Routes = [
  {
    path: 'period',
    loadChildren: () => import('../../modules/period/period.module').then(m => m.PeriodModule),
    canActivate: [ AuthorizedGuard ]
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
