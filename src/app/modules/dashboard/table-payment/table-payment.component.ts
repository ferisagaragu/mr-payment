import { AfterViewInit, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentService } from '../../../core/http/payment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { PaymentTypeEnum } from '../../../core/enums/payment-type.enum';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tablePaymentColumns } from '../../../core/columns/table-payment.columns';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-payment',
  templateUrl: './table-payment.component.html',
  styleUrls: ['./table-payment.component.scss']
})
export class TablePaymentComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  periodUuid: string;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  form: FormGroup;
  payments: Array<any>;
  disableAll: boolean;
  paymentType: PaymentTypeEnum;
  todayDate: Date;
  loadData: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    @Inject(MAT_DIALOG_DATA) public data: { periodUuid: string, enable: boolean }
  ) {
    this.periodUuid = data.periodUuid;
    this.dataSource = new MatTableDataSource<any>();
    this.displayedColumns = tablePaymentColumns;
    this.disableAll = !data.enable
    this.form = this.formBuilder.group({ });
    this.todayDate = new Date();
    this.loadData = false;
  }

  ngOnInit(): void {
    this.reloadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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

    const payment = this.payments.find(payment => payment.uuid === 0);
    payment.load = true;

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

  update(paymentUuid: string): void {
    if (this.form.invalid) {
      return;
    }

    const payment = this.payments.find(payment => payment.uuid === paymentUuid);
    payment.load = true;

    this.paymentService.updatePayment({
      ...payment,
      ...this.form.value
    }).subscribe(_ => {
      this.reloadData();
      this.disableAll = false;
    });
  }

  onAdd() {
    this.disableAll = true;
    this.payments.push({
      uuid: 0,
      edit: true,
      newElement: true
    });
    this.dataSource.data = this.payments;
    this.dataSource.paginator = this.paginator;
    this.createForm();
  }

  onUpdate(paymentUuid: string): void {
    const payment = this.payments.find(payment => payment.uuid === paymentUuid);
    payment.edit = true;
    this.disableAll = true;
    this.createForm(payment);
  }

  onRemove(paymentUuid: string) {
    Swal.fire({
      icon: 'question',
      title: '¿Quieres borrar el pago?',
      text:
        'Toma en cuenta que una vez eliminado no podrás recuperarlo. ' +
        'Si estas eliminando algún pago recurrente o mensual, este ya no ' +
        'se generara el próximo mes.',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(resp => {
      if (resp.isConfirmed) {
        const payment = this.payments.find(payment => payment.uuid === paymentUuid);
        payment.load = true;
        this.paymentService.deletePayment(paymentUuid).subscribe(_ => this.reloadData());
      }
    });
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

  onChangeType(event: PaymentTypeEnum): void {
    this.paymentType = event;

    if (
      event === PaymentTypeEnum.UNIQUE ||
      event === PaymentTypeEnum.RECURRENT ||
      event === PaymentTypeEnum.SAVE
    ) {
      this.form.get('quantity').enable();

      this.form.get('startDate').setValue(null);
      this.form.get('startDate').disable();
      this.form.get('endDate').setValue(null);
      this.form.get('endDate').disable();
      this.form.get('totalQuantity').setValue(null);
      this.form.get('totalQuantity').disable();
    } else {
      this.form.get('startDate').enable();
      this.form.get('endDate').enable();
      this.form.get('totalQuantity').enable();

      this.form.get('quantity').setValue(null);
      this.form.get('quantity').disable();
    }
  }

  private createForm(payment?: any): void {
    this.form = this.formBuilder.group({
      type: [payment ? payment.type : 0],
      name: [payment ? payment.name : null, Validators.required],
      quantity: [payment ? payment.quantity : null, Validators.required],
      startDate: [{ value: null, disabled: true }, Validators.required],
      endDate: [{ value: null, disabled: true }, Validators.required],
      totalQuantity: [{ value: null, disabled: true }, Validators.required]
    });
  }

  private reloadData(): void {
    this.dataSource.data = [];
    this.loadData = true;

    this.paymentService.findAll(this.periodUuid).subscribe(resp => {
      this.dataSource.data = resp;
      this.payments = resp;
      this.loadData = false;
    });
  }

}
