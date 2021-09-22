import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPeriodComponent } from './view-period.component';

describe('ViewPeriodComponent', () => {
  let component: ViewPeriodComponent;
  let fixture: ComponentFixture<ViewPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
