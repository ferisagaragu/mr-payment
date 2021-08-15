import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';

import { DATE_FORMAT } from '../core/formats/date.format';

import { LogoComponent } from './logo/logo.component';
import { HeaderComponent } from './header/header.component';
import { AlertComponent } from './alert/alert.component';
import { FormIndicatorComponent } from './form-indicator/form-indicator.component';
import { UrxAlertModule, UrxFormatModule } from 'ng-urxnium';

@NgModule({
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },{
      provide: MAT_DATE_FORMATS,
      useValue: DATE_FORMAT
    }
  ],
	declarations: [
		LogoComponent,
    HeaderComponent,
    AlertComponent,
    FormIndicatorComponent
	],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatMenuModule,
    UrxAlertModule,
    UrxFormatModule
  ],
	exports: [
		ReactiveFormsModule,
		MatPaginatorModule,
		MatTableModule,
		MatButtonModule,
		MatIconModule,
		MatDatepickerModule,
		MatInputModule,
		MatFormFieldModule,
		MatDialogModule,
		MatCardModule,
		MatCheckboxModule,
		MatSlideToggleModule,
		MatTooltipModule,
		MatSelectModule,
		MatProgressSpinnerModule,
		MatChipsModule,
		MatMenuModule,
    UrxAlertModule,
    UrxFormatModule,

		HeaderComponent,
		AlertComponent,
		LogoComponent
	]
})
export class SharedModule { }
