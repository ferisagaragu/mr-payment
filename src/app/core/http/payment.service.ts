import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  public onPay: BehaviorSubject<void>;

  constructor(private http: HttpClient) {
    this.onPay = new BehaviorSubject<void>(null);
  }

  findAll(paymentUuid: string): Observable<Array<any>> {
    return this.http.get(`http://localhost:5000/rest/payment/${paymentUuid}`).pipe(
      map((resp:any) => resp.data.map(data => data))
    );
  }

  createPayment(payment: any): Observable<any> {
    return this.http.post('http://localhost:5000/rest/payment', payment);
  }

  setPaymentPaid(paymentUuid: string, pay: boolean): Observable<any> {
    return this.http.patch(
      `http://localhost:5000/rest/payment`,
      { uuid: paymentUuid, pay }
    ).pipe(map(resp => {
      this.onPay.next();

      return resp;
    }));
  }

  deletePayment(paymentUuid: string): Observable<any> {
    return this.http.delete(`http://localhost:5000/rest/payment/${paymentUuid}`)
  }

}
