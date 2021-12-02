import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-MX';
import { environment } from '../environments/environment';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: 'baseUrl', useValue: environment.baseUrl },
    { provide: 'authRoute', useValue: { authorized: 'auth', unauthorized: 'period' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
