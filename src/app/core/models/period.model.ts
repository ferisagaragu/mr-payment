import * as moment from 'moment';

export class PeriodModel {

  uuid: string;
  name: string;
  debt: number;
  date: Date;
  remainingDebt: number;
  freeMoney: number;
  biweekly: number;
  enable: boolean;

  constructor(data: PeriodModel | any) {
    Object.assign(this, data);
    moment.locale('es');

    this.name = moment(data.date).format('MMMM YYYY');
  }

}
