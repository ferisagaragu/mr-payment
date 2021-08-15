export class AlertConfigModel {

  uuid: string;
  hardQuantity: number;
  lowQuantity: number;
  mediumQuantity: number;

  constructor(data: AlertConfigModel | any) {
    Object.assign(this, data);
  }

}
