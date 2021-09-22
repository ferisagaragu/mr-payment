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
    private router: Router,
    private activatedRoute: ActivatedRoute
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
      if (resp === 'add-payment') {
        this.router.navigate(['payment', period.uuid]);
      }
    });

    event.preventDefault();
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

}
