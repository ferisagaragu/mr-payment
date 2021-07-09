import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodModel } from '../../../core/models/period.model';
import { PaymentService } from '../../../core/http/payment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { PaymentTypeEnum } from '../../../core/enums/payment-type.enum';

@Component({
  selector: 'app-table-payment',
  templateUrl: './table-payment.component.html',
  styleUrls: ['./table-payment.component.scss']
})
export class TablePaymentComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  displayedColumns: string[];
  dataSource: MatTableDataSource<PeriodModel>;
  form: FormGroup;
  payments: Array<any>;
  disableAll: boolean;
  paymentType: PaymentTypeEnum;
  periodUuid: string = '80ea909a-d87d-4ad7-873a-631b60395c5c';
  todayDate: Date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private paymentService: PaymentService
  ) {
    this.displayedColumns = [
      'type',
      'name',
      'quantity',
      'date',
      'totalQuantity',
      'pay',
      'actions'
    ];
    this.dataSource = null;
    this.disableAll = false;
    this.form = this.formBuilder.group({ });
  }

  ngAfterViewInit(): void {
    this.reloadData();
  }

  onSetPaid(paymentUuid: string, event: MatCheckboxChange): void {
    const payment = this.payments.find(payment => payment.uuid === paymentUuid);
    payment.checkLoad = true;
    this.disableAll = true;

    this.paymentService.setPaymentPaid(paymentUuid, event.checked).subscribe(
      _ => {
        delete payment.checkLoad;
        this.disableAll = false;
        this.reloadData();
      }
    );
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    this.paymentService.createPayment({
      periodUuid: this.periodUuid,
      ...this.form.value,
      startDate: this.form.value.startDate?.toDate(),
      endDate: this.form.value.endDate?.toDate()
    }).subscribe(_ => {
      this.reloadData();
      this.disableAll = false;
    });
  }

  update(): void {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value)
  }

  onAdd() {
    this.disableAll = true;
    this.payments.push({
      edit: true,
      newElement: true
    });
    this.dataSource = new MatTableDataSource<any>(this.payments);
    this.dataSource.paginator = this.paginator;
    this.onChangeType(PaymentTypeEnum.UNIQUE);
  }

  onUpdate(paymentUuid: string): void {
    const payment = this.payments.find(payment => payment.uuid === paymentUuid);
    payment.edit = true;
    this.disableAll = true;

    this.onChangeType(null, payment);
  }

  onRemove(paymentUuid: string) {
    //TODO add in this part logic to validate if the user authorize erase payment

    this.paymentService.deletePayment(paymentUuid).subscribe(
      _ => {
        this.reloadData();
      }
    );
  }

  onCancel(paymentUuid: any): void {
    const payment = this.payments.find(payment => payment.uuid === paymentUuid);
    delete payment.edit
    this.disableAll = false;
  }

  onCancelNew(): void {
    this.payments.pop();
    this.dataSource = new MatTableDataSource<any>(this.payments);
    this.dataSource.paginator = this.paginator;
    this.disableAll = false;
  }

  onChangeType(event: PaymentTypeEnum | undefined, payment?: any): void {
    if (
      event === PaymentTypeEnum.UNIQUE || event === PaymentTypeEnum.RECURRENT ||
      payment?.type === PaymentTypeEnum.UNIQUE || payment?.type === PaymentTypeEnum.RECURRENT
    ) {
      this.paymentType = PaymentTypeEnum.UNIQUE;
      this.form = this.formBuilder.group({
        type: [payment ? payment.type : event],
        name: [payment ? payment.name : null, Validators.required],
        quantity: [payment ? payment.quantity : null, Validators.required],
        startDate: [],
        endDate: [],
        totalQuantity: [{ value: null, disabled: true }]
      });
    } else {
      this.paymentType = PaymentTypeEnum.MONTHLY;
      this.form = this.formBuilder.group({
        type: [payment ? payment.type : event],
        name: [payment ? payment.name : null, Validators.required],
        quantity: [{ value: null, disabled: true }],
        startDate: [payment ? payment.startDate : null],
        endDate: [payment ? payment.endDate : null],
        totalQuantity: [payment ? payment.totalQuantity : null]
      });
    }
  }

  private reloadData(): void {
    this.paymentService.findAll(this.periodUuid).subscribe(resp => {
      this.dataSource = new MatTableDataSource<any>(resp);
      this.dataSource.paginator = this.paginator;
      this.payments = resp;
    });
  }

}
