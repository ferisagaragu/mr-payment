import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipPeriodDetailComponent } from './chip-period-detail.component';

describe('ChipPeriodDetailComponent', () => {
  let component: ChipPeriodDetailComponent;
  let fixture: ComponentFixture<ChipPeriodDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipPeriodDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipPeriodDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
