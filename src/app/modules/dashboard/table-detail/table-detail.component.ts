import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PeriodService } from '../../../core/http/period.service';
import { PeriodModel } from '../../../core/models/period.model';
import { MatDialog } from '@angular/material/dialog';
import { TablePaymentComponent } from '../table-payment/table-payment.component';
import { PaymentService } from '../../../core/http/payment.service';
import { tableDetailColumns } from '../../../core/columns/table-detail.columns';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss']
})
export class TableDetailComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  displayedColumns: string[];
  dataSource: MatTableDataSource<PeriodModel>;
  loadData: boolean;
  clickedRow: any;
  periodDetail: any;
  periodLoad: boolean;

  settings = {
    highPayments: 3000,
    mediumPayments: 2000,
    normalPayments: 1999
  }

  constructor(
    private periodService: PeriodService,
    private paymentService: PaymentService,
    public dialog: MatDialog
  ) {
    this.displayedColumns = tableDetailColumns;
    this.dataSource = new MatTableDataSource<PeriodModel>();
    this.periodLoad = false;
  }

  ngOnInit() {
    this.subscribeOnPay();
    this.calculateNext();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onAddPayments(periodUuid: string): void {
    this.dialog.open(
      TablePaymentComponent,
      {
        data: periodUuid,
        width: '95%',
        height: '75%',
        maxWidth: 'none',
        maxHeight: 'none'
      }
    );
  }

  private subscribeOnPay() {
    this.paymentService.onPay.subscribe(_ => this.reloadData());
  }

  private calculateNext() {
    this.periodService.calculateNext().subscribe(resp => {
      if (resp.status) {
        this.reloadData();
      }
    });
  }

  onRowClick(row: any): void {
    this.clickedRow = row;
    this.periodLoad = true;

    this.periodService.findPeriodDetail(row.uuid).subscribe(resp => {
      this.periodDetail = resp;
      this.periodLoad = false;
      console.log(resp);
    });
  }

  private reloadData(): void {
    this.dataSource.data = [];
    this.loadData = true;

    this.periodService.findAll().subscribe(resp => {
      this.dataSource.data = resp;
      this.loadData = false;
    });
  }

}
