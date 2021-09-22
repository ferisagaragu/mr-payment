import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-menu-action',
  templateUrl: './menu-action.component.html',
  styleUrls: ['./menu-action.component.scss']
})
export class MenuActionComponent implements OnInit {

  name: string;
  type: string;
  disableOption: string;

  private readonly periodUuid: string;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<MenuActionComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    const { periodUuid, name, type, disableOption } = data;

    this.name = name;
    this.type = type;
    this.disableOption = disableOption;
    this.periodUuid = periodUuid;
  }

  ngOnInit(): void { }

  onAddPayments(): void {
    this.bottomSheetRef.dismiss('add-payment');
  }

  onAddPayment(): void {
    this.bottomSheetRef.dismiss('add');
  }

  onUpdatePayment(): void {
    this.bottomSheetRef.dismiss('update');
  }

  onRemovePayment(): void {
    this.bottomSheetRef.dismiss('remove');
  }

}
