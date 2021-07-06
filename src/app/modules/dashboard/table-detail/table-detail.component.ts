import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PeriodService } from '../../../core/http/period.service';
import { PeriodModel } from '../../../core/models/period.model';
import { MatDialog } from '@angular/material/dialog';
import { TablePaymentComponent } from '../table-payment/table-payment.component';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss']
})
export class TableDetailComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  displayedColumns: string[];
  dataSource: MatTableDataSource<PeriodModel>;
  settings = {
    highPayments: 3000,
    mediumPayments: 2000,
    normalPayments: 1999
  }

  constructor(
    private periodService: PeriodService,
    public dialog: MatDialog
  ) {
    this.displayedColumns = [
      'name',
      'debt',
      'remainingDebt',
      'freeMoney',
      'biweekly',
      'actions'
    ];
    this.dataSource = null;

    this.dialog.open(
      TablePaymentComponent,
      {
        disableClose: true
      }
    );
  }

  ngAfterViewInit() {
    this.periodService.findAll().subscribe(resp => {
      this.dataSource = new MatTableDataSource<any>(resp);
      this.dataSource.paginator = this.paginator;
    });
  }

  onAddPayments(): void {
    this.dialog.open(
      TablePaymentComponent,
      {
        disableClose: true
      }
    );
  }

}
