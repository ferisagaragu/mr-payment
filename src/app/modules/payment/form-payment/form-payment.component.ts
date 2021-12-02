import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { currentFormat } from '../../../core/formats/current.format';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentService } from '../../../core/http/payment.service';
import { SweetAlert2Service } from 'ng-urxnium';
import { DialogIdEnum } from '../../../core/enums/dialog-id.enum';
import { PaymentTypeEnum } from '../../../core/enums/payment-type.enum';

@Component({
  selector: 'app-form-payment',
  templateUrl: './form-payment.component.html',
  styleUrls: ['./form-payment.component.scss']
})
export class FormPaymentComponent implements OnInit {

  form: FormGroup;
  maskAliases: any;
  todayDate: Date;
  elementSelected: boolean;
  multiple: boolean;
  delete: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private paymentService: PaymentService,
    private swal: SweetAlert2Service,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = null;
    this.maskAliases = currentFormat;
    this.todayDate = new Date();
    this.elementSelected = data.elementSelected;
    this.multiple = false;
    this.delete = data.type;
  }

  ngOnInit(): void {
    if (this.delete) {
      this.removePayment();
    } else {
      this.form = this.formBuilder.group({
        type: [this.data.elementSelected?.type ? this.data.elementSelected.type : 0],
        name: [this.data.elementSelected?.name ? this.data.elementSelected.name : null, Validators.required],
        quantity: [
          this.data.elementSelected?.quantity ? this.data.elementSelected.quantity : null,
          Validators.compose([
            Validators.required,
            Validators.min(0)
          ])
        ],
        startDate: [
          {
            value: this.data.elementSelected?.startDate,
            disabled: this.data.elementSelected?.type !== 1
          },
          Validators.required
        ],
        endDate: [
          {
            value: this.data.elementSelected?.endDate,
            disabled: this.data.elementSelected?.type !== 1
          },
          Validators.required
        ],
        totalQuantity: [
          {
            value: this.data.elementSelected?.totalQuantity,
            disabled: this.data.elementSelected?.type !== 1
          },
          Validators.required
        ]
      });
    }

    this.form.get('type').valueChanges.subscribe(resp => {
      if (resp === PaymentTypeEnum.MONTHLY) {
        this.form.get('startDate').enable();
        this.form.get('endDate').enable();
        this.form.get('totalQuantity').enable();
        this.form.get('quantity').disable();
      } else {
        this.form.get('startDate').disable();
        this.form.get('endDate').disable();
        this.form.get('totalQuantity').disable();
        this.form.get('quantity').enable();
      }
    });
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    const elementSelected = this.data.elementSelected;
    const elements = this.data.elements;
    const quantity = this.form.value.quantity;
    const periodUuid = this.data.periodUuid;

    if (elementSelected) {
      const data = {
        ...elementSelected,
        ...this.form.value,
        quantity,
        pending: true
      }

      elements.forEach((element: any, index: number) => {
        if (element.uuid === data.uuid) {
          elements[index] = data;
          this.paymentService.onChange.next({ data: elements });
        }
      });

      this.dialog.getDialogById(DialogIdEnum.PAYMENT_DIALOG).close();
      this.updatePayment(data);
    } else {
      const data = {
        ...this.form.value,
        quantity,
        periodUuid,
        pending: true
      }

      this.data.elements.push(data);
      this.paymentService.onChange.next({ data: elements });

      if (this.multiple) {
        this.form.reset({
          type: this.form.value.type
        });
      } else {
        this.dialog.getDialogById(DialogIdEnum.PAYMENT_DIALOG).close();
      }

      this.createPayment(data);
    }
  }

  onClose(): void {
    this.dialog.getDialogById(DialogIdEnum.PAYMENT_DIALOG).close();
  }

  private createPayment(data: any): void {
    this.paymentService.createPayment(data).subscribe(_ => {
      this.findAllPayments();
      this.snackBar.open(
        `El pago '${data.name}' ha sido creado`,
        'OK',
        {
          duration: 3000
        }
      );
    });
  }

  private updatePayment(data: any): void {
    this.paymentService.updatePayment(data).subscribe(_ => {
      this.findAllPayments();
      this.snackBar.open(
        `El pago '${data.name}' ha sido actualizado`,
        'OK',
        {
          duration: 3000
        }
      );
    });
  }

  private removePayment(): void {
    this.swal.fire({
      theme: 'material',
      icon: 'question',
      title: '¿Quieres borrar el pago?',
      text: 'Toma en cuenta que una vez eliminado no podrás recuperarlo. ' +
        'Si estas eliminando algún pago recurrente o mensual, este ya no ' +
        'se generara el próximo mes.',
      showCancelButton: true,
      allowOutsideClick: false,
      materialButtonsColor: '#3f51b5'
    }).subscribe(resp => {
      if (resp) {
        const elements = this.data.elements;
        const elementSelected = this.data.elementSelected;

        elements.forEach((payment: any, index: number) => {
          if (payment.uuid === elementSelected.uuid) {
            elements[index].pending = true;
          }
        });

        this.paymentService.deletePayment(
          elementSelected.uuid
        ).subscribe(_ => {
          this.findAllPayments();
          this.snackBar.open(
            `El pago '${elementSelected.name}' ha sido eliminado`,
            'OK',
            {
              duration: 3000
            }
          );
        });
      }

      this.dialog.getDialogById(DialogIdEnum.PAYMENT_DIALOG).close();
    });
  }

  private findAllPayments(): void {
    this.paymentService.findAll(this.data.periodUuid).subscribe(resp => {
      this.paymentService.onChange.next(resp);
    });
  }

}
