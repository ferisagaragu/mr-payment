export class PeriodDetailModel {

  unique: number;
  monthly: number;
  recurrent: number;
  save: number;

  constructor(data: PeriodDetailModel | any) {
    Object.assign(this, data);
  }

}
