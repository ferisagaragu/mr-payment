import { TestBed } from '@angular/core/testing';

import { MetaInfService } from './meta-inf.service';

describe('MetaInfService', () => {
  let service: MetaInfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetaInfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
