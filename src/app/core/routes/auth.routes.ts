import { Routes } from '@angular/router';
import { SignInComponent } from '../../modules/auth/sign-in/sign-in.component';
import { UnauthorizedGuard } from 'ng-urxnium';

export const AUTH_ROUTING: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../../modules/auth/auth.module').then(m => m.AuthModule),
    canActivate: [ UnauthorizedGuard ]
  }
];

export const AUTH_ROUTING_CHILDREN: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in'
  },{
    path: 'sign-in',
    component: SignInComponent
  }
];
