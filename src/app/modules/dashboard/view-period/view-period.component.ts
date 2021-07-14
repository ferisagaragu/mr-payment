import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-view-period',
  templateUrl: './view-period.component.html',
  styleUrls: ['./view-period.component.scss']
})
export class ViewPeriodComponent {

  day: number;

  constructor() {
    this.day = parseInt(moment().format('DD'));
  }

}
