import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionAlertPeriodComponent } from './section-alert-period.component';

describe('SectionAlertPeriodComponent', () => {
  let component: SectionAlertPeriodComponent;
  let fixture: ComponentFixture<SectionAlertPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionAlertPeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionAlertPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
