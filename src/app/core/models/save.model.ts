export class SaveModel {

  uuid: string;
  periodDate: Date;
  quantity: number
  used: boolean;

  constructor(data: SaveModel | any) {
    Object.assign(this, data);
  }

}
