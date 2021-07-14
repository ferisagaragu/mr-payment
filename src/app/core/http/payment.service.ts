import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  public onPay: BehaviorSubject<void>;

  constructor(private http: HttpClient) {
    this.onPay = new BehaviorSubject<void>(null);
  }

  findAll(paymentUuid: string): Observable<Array<any>> {
    return this.http.get(`${environment.baseUrl}/payments/${paymentUuid}`).pipe(
      map((resp: any) => resp.data.map(data => data))
    );
  }

  createPayment(payment: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/payments`, payment).pipe(map(resp => {
      this.onPay.next();
      return resp;
    }));
  }

  updatePayment(payment: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/payments`, payment).pipe(map(resp => {
      this.onPay.next();
      return resp;
    }));
  }

  setPaymentPaid(paymentUuid: string, pay: boolean): Observable<any> {
    return this.http.patch(
      `${environment.baseUrl}/payments`,
      { uuid: paymentUuid, pay }
    ).pipe(map(resp => {
      this.onPay.next();
      return resp;
    }));
  }

  deletePayment(paymentUuid: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/payments/${paymentUuid}`).pipe(map(resp => {
      this.onPay.next();
      return resp;
    }));
  }

}
