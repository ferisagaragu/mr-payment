import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PeriodService } from '../../../core/http/period.service';
import { PeriodModel } from '../../../core/models/period.model';
import { MatDialog } from '@angular/material/dialog';
import { TablePaymentComponent } from '../table-payment/table-payment.component';
import { PaymentService } from '../../../core/http/payment.service';
import { tableDetailColumns } from '../../../core/columns/table-detail.columns';
import { AlertConfigService } from '../../../core/http/alert-config.service';
import { AlertConfigModel } from '../../../core/models/alert-config.model';

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
  alertConfig: AlertConfigModel;

  settings = {
    highPayments: 3000,
    mediumPayments: 2000,
    normalPayments: 1999
  }

  constructor(
    private periodService: PeriodService,
    private paymentService: PaymentService,
    private alertConfigService: AlertConfigService,
    public dialog: MatDialog
  ) {
    this.displayedColumns = tableDetailColumns;
    this.dataSource = new MatTableDataSource<PeriodModel>();
    this.periodLoad = false;
  }

  ngOnInit() {
    this.subscribeOnConfig();
    this.subscribeOnPay();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onAddPayments(periodUuid: string, enable: boolean): void {
    this.dialog.open(
      TablePaymentComponent,
      {
        data: { periodUuid, enable},
        width: '96%',
        height: '75%',
        maxWidth: 'none',
        maxHeight: 'none'
      }
    );
  }

  onRowClick(periodUuid: string): void {
    this.selectedPeriodUuid = periodUuid;
    this.periodLoad = true;

    this.periodService.findPeriodDetail(periodUuid).subscribe(resp => {
      this.periodDetail = resp;
      this.periodLoad = false;
    });
  }

  private subscribeOnPay(): void {
    this.paymentService.onPay.subscribe(_ => this.reloadData());
  }

  private subscribeOnConfig(): void {
    this.alertConfigService.onConfig.subscribe(_ => this.findAlertConfig());
  }

  private findAlertConfig(): void {
    this.alertConfigService.findAlertConfig().subscribe(resp => {
      this.alertConfig = resp;
    });
  }

  private reloadData(): void {
    this.dataSource.data = [];
    this.loadData = true;

    this.periodService.findAll().subscribe(resp => {
      this.dataSource.data = resp;
      this.loadData = false;

      const period = resp.find(period => period.enable);
      this.onRowClick(period.uuid);
    });
  }

}
