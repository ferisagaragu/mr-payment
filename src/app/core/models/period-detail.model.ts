export class PeriodDetailModel {

  unique: number;
  monthly: number;
  recurrent: number;

  constructor(data: PeriodDetailModel | any) {
    Object.assign(this, data);
  }

}
