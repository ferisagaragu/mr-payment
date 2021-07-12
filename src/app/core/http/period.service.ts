import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PeriodModel } from '../models/period.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Array<PeriodModel>> {
    return this.http.get('http://localhost:5000/rest/period').pipe(
      map((resp:any) => resp.data.map(data => new PeriodModel(data)))
    );
  }

  findPeriodDetail(periodUuid: string): Observable<any> {
    return this.http.get(`http://localhost:5000/rest/period/detail/${periodUuid}`).pipe(
      map((resp: any) => resp.data)
    );
  }

  calculateNext(): Observable<any> {
    return this.http.post(
      'http://localhost:5000/rest/period/calculate-next',
      { }
    );
  }

}
