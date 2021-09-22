import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-section-alert-period',
  templateUrl: './section-alert-period.component.html',
  styleUrls: ['./section-alert-period.component.scss']
})
export class SectionAlertPeriodComponent {

  day: number;

  constructor() {
    this.day = parseInt(moment().format('DD'));
  }

}
