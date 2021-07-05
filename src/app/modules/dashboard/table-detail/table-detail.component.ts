import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PeriodService } from '../../../core/http/period.service';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss']
})
export class TableDetailComponent implements OnInit {
  displayedColumns: string[] = ['period', 'payments', 'paid', 'freeMoney', 'distribution', 'actions'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  settings = {
    highPayments: 3000,
    mediumPayments: 2000,
    normalPayments: 1999
  }

  constructor(private periodService: PeriodService) { }

  ngOnInit(): void {
    this.periodService.findAll().subscribe(resp => {
      console.log(resp);
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }

}

const ELEMENT_DATA = [
  {period: 'Junio 2021', payments: 8543, paid: 8543, freeMoney: 4027 },
  {period: 'Julio 2021', payments: 8543, paid: 5000, freeMoney: 5027 }
];
