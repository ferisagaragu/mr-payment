import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertConfigService } from '../../core/http/alert-config.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form-indicator',
  templateUrl: './form-indicator.component.html',
  styleUrls: ['./form-indicator.component.scss']
})
export class FormIndicatorComponent implements OnInit {

  form: FormGroup;
  alertConfigUuid: string;
  load: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private alertConfigService: AlertConfigService,
    private dialog: MatDialog
  ) {
    this.load = false;
    this.createForm();
  }

  ngOnInit(): void {
    this.alertConfigService.findAlertConfig().subscribe(resp => {
      this.form.reset(resp);
      this.alertConfigUuid = resp.uuid;
    });
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    this.load = true;
    this.form.disable();

    this.alertConfigService.createAlertConfig({
      uuid: this.alertConfigUuid,
      ...this.form.value
    }).subscribe(_ => {
      this.load = false;
      this.dialog.closeAll();
    });
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      lowQuantity: ['', Validators.required],
      mediumQuantity: ['', Validators.required],
      hardQuantity: ['', Validators.required]
    });
  }

}
