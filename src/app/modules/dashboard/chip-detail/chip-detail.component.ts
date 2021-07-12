import { Component, Input, OnInit } from '@angular/core';

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

  constructor() {
    this.load = false;
    this.unique = 0;
    this.monthly = 0;
    this.recurrent = 0;
  }

  ngOnInit(): void {
  }

}
