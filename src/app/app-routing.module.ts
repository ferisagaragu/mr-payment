import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BASE_ROUTES } from './core/routes/base.routes';
import { DASHBOARD_ROUTING } from './core/routes/dashboard.routes';

const routes: Routes = [
  ...BASE_ROUTES,
  ...DASHBOARD_ROUTING
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
