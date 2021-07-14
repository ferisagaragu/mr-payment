import { Component, Input, OnInit } from '@angular/core';
import { SaveService } from '../../../core/http/save.service';

@Component({
  selector: 'app-chip-detail',
  templateUrl: './chip-detail.component.html',
  styleUrls: ['./chip-detail.component.scss']
})
export class ChipDetailComponent implements OnInit {

  @Input() load: boolean;
  @Input() unique: number;
  @Input() monthly: number;
  @Input() recurrent: number;
  @Input() save: number;

  totalSave: number;

  constructor(private saveService: SaveService) {
    this.load = false;
    this.unique = 0;
    this.monthly = 0;
    this.recurrent = 0;
    this.save = 0;
    this.totalSave = 0;
  }

  ngOnInit(): void {
    this.saveService.sumTotalSaves().subscribe(resp => {
      this.totalSave = resp;
    });
  }

}
