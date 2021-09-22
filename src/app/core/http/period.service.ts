import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PeriodModel } from '../models/period.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  constructor(private http: HttpClient) { }

  findAllPeriods(): Observable<Array<PeriodModel>> {
    return this.http.get(`${environment.baseUrl}/periods`).pipe(
      map((resp:any) => resp.data.map(data => new PeriodModel(data)))
    );
  }

}
