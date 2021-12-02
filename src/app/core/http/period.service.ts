import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PeriodModel } from '../models/period.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  public onChange: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.onChange = new BehaviorSubject<any>(null);
  }

  findAllPeriods(): Observable<Array<PeriodModel>> {
    return this.http.get(`${environment.baseUrl}/periods`).pipe(
      map((resp:any) => resp.data.map(data => new PeriodModel(data)))
    );
  }

  createPeriod(month: number, year: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}/periods/calculate-next-period/${month}/${year}`);
  }

  deletePeriod(periodUuid: string) {
    return this.http.delete(`${environment.baseUrl}/periods/${periodUuid}`);
  }

}
