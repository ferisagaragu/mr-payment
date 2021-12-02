import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodModel } from '../../../core/models/period.model';
import { AlertConfigModel } from '../../../core/models/alert-config.model';
import { PeriodService } from '../../../core/http/period.service';
import { AlertConfigService } from '../../../core/http/alert-config.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { tablePeriodColumns } from '../../../core/columns/table-period.columns';
import { MenuActionComponent } from '../../../shared/menu-action/menu-action.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { FormPeriodComponent } from '../form-period/form-period.component';
import { DialogIdEnum } from '../../../core/enums/dialog-id.enum';
import { SweetAlert2Service } from 'ng-urxnium';

@Component({
  selector: 'app-table-month',
  templateUrl: './table-month.component.html',
  styleUrls: ['./table-month.component.scss']
})
export class TableMonthComponent  implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[];
  dataSource: MatTableDataSource<PeriodModel>;
  load: boolean;
  selectedPeriod: PeriodModel;
  alertConfig: AlertConfigModel;

  constructor(
    private periodService: PeriodService,
    private alertConfigService: AlertConfigService,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private swal: SweetAlert2Service
  ) {
    this.displayedColumns = tablePeriodColumns;
    this.dataSource = new MatTableDataSource<PeriodModel>();
    this.load = false;
    this.selectedPeriod = null;
    this.alertConfig = null;
  }

  ngOnInit() {
    this.loadData();
    this.subscribeOnConfig();
    this.subscribeOnPeriodChanges()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onRightClick(event: MouseEvent, period: PeriodModel): void {
    this.selectedPeriod = period;

    this.bottomSheet.open(
      MenuActionComponent,
      {
        data: {
          type: 'detail',
          name: period.name
        }
      }
    ).afterDismissed().subscribe(resp => {
      if (resp === 'view-payment') {
        this.router.navigate(['payment', period.uuid]);
      }

      if (resp === 'add-period') {
        this.dialog.open(
          FormPeriodComponent,
          {
            id: DialogIdEnum.PERIOD_DIALOG,
            disableClose: true,
            width: '40%',
            data: this.dataSource.data
          }
        );
      }

      if (resp === 'remove-period') {
        this.swal.fire({
          icon: 'warning',
          title: `¿Estas seguro que quieres eliminar el periodo?`,
          text: `Todos los datos del periodo <b>${period.name}</b> se perderán.`,
          allowOutsideClick: false,
          showCancelButton: true,
          reverseButtons: true,
          theme: 'material'
        }).subscribe(resp => {
          if (resp) {
            (period as any).pending = true;

            this.periodService.deletePeriod(period.uuid).subscribe(_ => {
              const periodIndex = this.dataSource.data.findIndex(
                periodSearch => periodSearch.uuid === period.uuid
              );

              this.dataSource.data.splice(
                periodIndex,
                1
              );

              this.dataSource.data = this.dataSource.data;
            });
          }
        });
      }
    });

    event.preventDefault();
  }

  onAdd(): void {
    this.dialog.open(
      FormPeriodComponent,
      {
        id: DialogIdEnum.PERIOD_DIALOG,
        disableClose: true,
        width: '40%',
        data: this.dataSource.data
      }
    );
  }

  private subscribeOnConfig(): void {
    this.alertConfigService.onConfig.subscribe(_ => this.findAlertConfig());
  }

  private findAlertConfig(): void {
    this.alertConfigService.findAlertConfig().subscribe(resp => this.alertConfig = resp);
  }

  private loadData(): void {
    this.dataSource.data = [];
    this.load = true;

    this.periodService.findAllPeriods().subscribe(resp => {
      const selectedPeriod = this.activatedRoute.snapshot.paramMap.get('periodUuid');
      this.dataSource.data = resp;
      this.load = false;

      this.selectedPeriod = this.dataSource.data.find(period => period.uuid === selectedPeriod);
    });
  }

  private subscribeOnPeriodChanges() {
    this.periodService.onChange.subscribe(resp => {
      if (resp) this.dataSource.data = resp;
    });
  }

}
