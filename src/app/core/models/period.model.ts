import { PeriodDetailModel } from './period-detail.model';

export class PeriodModel {

  uuid: string;
  date: Date;
  name: string;
  save: number;
  enable: boolean;
  individual: number;
  debt: number
  biweekly: number;
  freeMoney: number;
  remainingDebt: number;
  totalMoney: number;
  detail: PeriodDetailModel;

  constructor(data: PeriodModel | any) {
    Object.assign(this, data);
  }

}
