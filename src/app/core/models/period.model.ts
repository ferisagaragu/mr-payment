export class PeriodModel {

  uuid: string;
  name: string;
  debt: number;
  date: Date;
  remainingDebt: number;

  constructor(data: PeriodModel | any) {
    Object.assign(this, data);
  }

}
