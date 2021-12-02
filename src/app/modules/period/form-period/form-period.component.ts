import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogIdEnum } from '../../../core/enums/dialog-id.enum';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DATE_YEAR_MONTH_FORMAT } from '../../../core/formats/date.format';
import { PeriodService } from '../../../core/http/period.service';
import { PeriodModel } from '../../../core/models/period.model';
import * as moment from 'moment';

@Component({
  selector: 'app-form-period',
  templateUrl: './form-period.component.html',
  styleUrls: ['./form-period.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_YEAR_MONTH_FORMAT },
  ]
})
export class FormPeriodComponent implements OnInit {

  form: FormGroup;
  load: boolean;

  private year: Moment;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private periodService: PeriodService,
    @Inject(MAT_DIALOG_DATA) public data: Array<PeriodModel>
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      periodName: [null, Validators.required]
    })
  }

  onYearSelected(event: Moment) {
    this.year = event;
  }

  onMonthSelected(event: Moment, picker: MatDatepicker<any>) {
    event.year(this.year.year());
    this.form.get('periodName').setValue(event);
    picker.close();
  }

  onClose(): void {
    this.dialog.getDialogById(DialogIdEnum.PERIOD_DIALOG).close();
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    const { periodName } = this.form.value;

    this.data.unshift(new PeriodModel({
      date: new Date(),
      name: moment(`${periodName.month() + 1}/01/${periodName.year()}`)
        .locale('es')
        .format('MMMM YYYY'),
      save: 0,
      enable: false,
      individual: 0,
      debt: 0,
      biweekly: 0,
      freeMoney: 0,
      remainingDebt: 0,
      totalMoney: 0,
      pending: true
    }));

    this.periodService.onChange.next(this.data);
    this.dialog.getDialogById(DialogIdEnum.PERIOD_DIALOG).close();

    this.periodService.createPeriod(periodName.month() + 1, periodName.year()).subscribe(_ => {
      this.periodService.findAllPeriods().subscribe(resp => {
        this.periodService.onChange.next(resp);
      });
    });
  }

}
