import { Component, Input, OnInit } from '@angular/core';
import { SaveService } from '../../../core/http/save.service';
import { PeriodDetailModel } from '../../../core/models/period-detail.model';

@Component({
  selector: 'app-chip-period-detail',
  templateUrl: './chip-period-detail.component.html',
  styleUrls: ['./chip-period-detail.component.scss']
})
export class ChipPeriodDetailComponent implements OnInit {

  @Input() periodDetail: PeriodDetailModel;

  totalSave: number;

  constructor(private saveService: SaveService) {
    this.totalSave = 0;
  }

  ngOnInit(): void {
    this.saveService.sumTotalSaves().subscribe(resp => {
      this.totalSave = resp;
    });
  }

}
