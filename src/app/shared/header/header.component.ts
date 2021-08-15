import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormIndicatorComponent } from '../form-indicator/form-indicator.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  private warning: boolean;

  constructor(public dialog: MatDialog) {
    this.warning = false;
  }

  onSettings(): void {
    this.dialog.open(
      FormIndicatorComponent,
      {
        maxWidth: 'none',
        maxHeight: 'none',
        width: '40%',
        height: '70%'
      }
    );
  }

}
