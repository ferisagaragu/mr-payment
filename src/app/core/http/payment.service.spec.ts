import { TestBed } from '@angular/core/testing';
import { PaymentService } from './payment.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('PaymentService', () => {
  let service: PaymentService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ PaymentService ]
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new PaymentService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created 2', (done: DoneFn) => {
    const expectedHeroes: any =
      { data: [{ id: 1, name: 'A' }, { id: 2, name: 'B' }], detail: { } };

    const expectedHeroes2: any =
      { data: [{ id: 1, name: 'A' }, { id: 2, name: 'C' }], detail: { } };

    httpClientSpy.get.and.returnValue(of(expectedHeroes));

    service.findAll('').subscribe(resp => {
        expect(resp).toEqual(expectedHeroes2, 'expected heroes');
        done();
      },
      done.fail
    );


  });

});
