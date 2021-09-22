import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMonthComponent } from './table-month.component';

describe('TableMonthComponent', () => {
  let component: TableMonthComponent;
  let fixture: ComponentFixture<TableMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
