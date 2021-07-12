import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipDetailComponent } from './chip-detail.component';

describe('ChipDetailComponent', () => {
  let component: ChipDetailComponent;
  let fixture: ComponentFixture<ChipDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
