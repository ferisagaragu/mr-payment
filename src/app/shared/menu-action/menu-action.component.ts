import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-menu-action',
  templateUrl: './menu-action.component.html',
  styleUrls: ['./menu-action.component.scss']
})
export class MenuActionComponent {

  name: string;
  type: string;

  private readonly periodUuid: string;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<MenuActionComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    const { periodUuid, name, type } = data;

    this.name = name;
    this.type = type;
    this.periodUuid = periodUuid;
  }

  onViewPayment(): void {
    this.bottomSheetRef.dismiss('view-payment');
  }

  onAddPeriod(): void {
    this.bottomSheetRef.dismiss('add-period');
  }

  onRemovePeriod(): void {
    this.bottomSheetRef.dismiss('remove-period');
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
