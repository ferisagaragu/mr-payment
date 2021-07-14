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
  selectedPeriodUuid: string;
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

  onAddPayments(periodUuid: string, enable: boolean): void {
    this.dialog.open(
      TablePaymentComponent,
      {
        data: { periodUuid, enable},
        width: '95%',
        height: '75%',
        maxWidth: 'none',
        maxHeight: 'none'
      }
    );
  }

  onRowClick(periodUuid: string, notLoad?: boolean): void {
    this.selectedPeriodUuid = periodUuid;
    this.periodLoad = true && !notLoad;

    this.periodService.findPeriodDetail(periodUuid).subscribe(resp => {
      this.periodDetail = resp;
      this.periodLoad = false;
    });
  }

  private subscribeOnPay(): void {
    this.paymentService.onPay.subscribe(_ => this.reloadData());
  }

  private calculateNext(): void {
    this.periodService.calculateNext().subscribe(resp => {
      if (resp.status) {
        this.reloadData(true);
      }
    });
  }

  private reloadData(notLoad?: boolean): void {
    if (!notLoad) {
      this.dataSource.data = [];
      this.loadData = true;
    }

    this.periodService.findAll().subscribe(resp => {
      this.dataSource.data = resp;
      this.loadData = false;

      const period = resp.find(period => period.enable);
      this.onRowClick(period.uuid, notLoad);
    });
  }

}
