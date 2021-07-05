import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  displayedColumns: string[] = ['period', 'payments', 'paid', 'freeMoney', 'distribution', 'actions'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  date = new FormControl();
  settings = {
    highPayments: 3000,
    mediumPayments: 2000,
    normalPayments: 1999
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
