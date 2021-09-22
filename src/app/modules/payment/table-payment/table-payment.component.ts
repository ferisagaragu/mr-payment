import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PaymentService } from '../../../core/http/payment.service';
import { ActivatedRoute } from '@angular/router';
import { tablePaymentColumns } from '../../../core/columns/table-payment.columns';
import { MatSort } from '@angular/material/sort';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MenuActionComponent } from '../../../shared/menu-action/menu-action.component';
import { MatDialog } from '@angular/material/dialog';
import { FormPaymentComponent } from '../form-payment/form-payment.component';
import { SweetAlert2Service } from 'ng-urxnium';
import { DialogIdEnum } from '../../../core/enums/dialog-id.enum';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { PaymentTypeEnum } from '../../../core/enums/payment-type.enum';

@Component({
  selector: 'app-table-payment',
  templateUrl: './table-payment.component.html',
  styleUrls: ['./table-payment.component.scss']
})
export class TablePaymentComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('tableContainer') tableContainer: ElementRef;

  displayedColumns: Array<string>;
  dataSource: MatTableDataSource<any>;
  periodUuid: string;
  selectedPayment: any;
  load: boolean;
  debt: number;
  remainingDebt: number;
  individual: number;
  biweekly: number;
  totalMoney: number;

  constructor(
    private paymentService: PaymentService,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private swal: SweetAlert2Service,
    private activatedRoute: ActivatedRoute
  ) {
    this.displayedColumns = tablePaymentColumns;
    this.dataSource = new MatTableDataSource<any>();
    this.periodUuid = this.activatedRoute.snapshot.paramMap.get('periodUuid');
    this.selectedPayment = null;
    this.load = false;
    this.debt = 0;
    this.remainingDebt = 0;
  }

  ngOnInit(): void {
    this.loadData();
    this.subscribePaymentChanges();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onRightClickRow(event: MouseEvent, payment: any): void {
    this.selectedPayment = payment;

    this.bottomSheet.open(
      MenuActionComponent,
      {
        data: {
          type: 'payment',
          disableOption:
            payment.type === PaymentTypeEnum.MONTHLY ?
              'update' :
              null
        }
      }
    ).afterDismissed().subscribe(resp => {
      switch (resp) {
        case 'add': this.onAdd(); break;
        case 'update': this.onUpdate(); break;
        case 'remove': this.onRemove(); break;
      }
    });

    event.preventDefault();
  }

  onAdd(): void {
    this.dialog.open(
      FormPaymentComponent,
      {
        id: DialogIdEnum.PAYMENT_DIALOG,
        disableClose: true,
        data: {
          periodUuid: this.activatedRoute.snapshot.paramMap.get('periodUuid'),
          elements: this.dataSource.data
        }
      }
    );
  }

  onUpdate(): void {
    this.dialog.open(
      FormPaymentComponent,
      {
        id: DialogIdEnum.PAYMENT_DIALOG,
        disableClose: true,
        data: {
          periodUuid: this.activatedRoute.snapshot.paramMap.get('periodUuid'),
          elementSelected: this.selectedPayment,
          elements: this.dataSource.data
        }
      }
    );
  }

  onRemove(): void {
    this.dialog.open(
      FormPaymentComponent,
      {
        id: DialogIdEnum.PAYMENT_DIALOG,
        panelClass: 'delete-alert-state',
        backdropClass: 'delete-alert-state',
        disableClose: true,
        data: {
          type: 'remove',
          periodUuid: this.activatedRoute.snapshot.paramMap.get('periodUuid'),
          elementSelected: this.selectedPayment,
          elements: this.dataSource.data
        }
      }
    );
  }

  onSetPaid(element: any, event: MatCheckboxChange): void {
    element.checkLoad = true;

    this.paymentService.setPaymentPaid(
      element.uuid,
      event.checked
    ).subscribe(_ => {
      element.checkLoad = false;
      element.pay = event.checked;
      this.remainingDebt = 0;

      this.dataSource.data.forEach(payment => {
        if (!payment.pay && payment.type !== PaymentTypeEnum.EXTRA) {
          this.remainingDebt += payment.quantity;
        }
      });
    });
  }

  private loadData(): void {
    this.dataSource.data = [];
    this.load = true;
    const paymentUuid = this.activatedRoute.snapshot.paramMap.get('paymentUuid');

    this.paymentService.findAll(this.periodUuid).subscribe(({ data, detail }) => {
      this.dataSource.data = data;
      this.load = false;
      this.selectedPayment = paymentUuid ?
        this.dataSource.data.find(payment => payment.uuid === paymentUuid) :
        this.dataSource.data[0];
      this.calculateTotal(detail);
      this.setIntoElement();
    });
  }

  private subscribePaymentChanges() {
    this.paymentService.onChange.subscribe(resp => {
      if (resp) {
        this.dataSource.data = resp.data;
        resp.detail ? this.calculateTotal(resp.detail) : undefined;
      }
    });
  }

  private setIntoElement(): void {
    setTimeout(() => {
      for (let element of this.tableContainer.nativeElement.getElementsByTagName('tr')) {
        if (element.id === this.selectedPayment?.uuid) {
          element.scrollIntoView({ block: 'center', behavior: "smooth" });
        }
      }
    }, 100);
  }

  private calculateTotal(detail: any): void {
    const { debt, remainingDebt, individual, biweekly, totalMoney } = detail;

    this.debt = debt;
    this.remainingDebt = remainingDebt;
    this.individual = individual;
    this.biweekly = biweekly;
    this.totalMoney = totalMoney;
  }

}
