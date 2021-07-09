import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

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
    );
  }

  deletePayment(paymentUuid: string): Observable<any> {
    return this.http.delete(`http://localhost:5000/rest/payment/${paymentUuid}`)
  }

}
