import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertConfigModel } from '../models/alert-config.model';

@Injectable({
  providedIn: 'root'
})
export class AlertConfigService {

  public onConfig: BehaviorSubject<void>;

  constructor(private http: HttpClient) {
    this.onConfig = new BehaviorSubject<void>(null);
  }

  findAlertConfig(): Observable<AlertConfigModel> {
    return this.http.get(`${environment.baseUrl}/alert-config`)
      .pipe(map((resp: any) => new AlertConfigModel(resp.data)))
  }

  createAlertConfig(alertConfig: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/alert-config`, alertConfig)
      .pipe(map((resp: any) => {
        this.onConfig.next();
        return resp;
      }));
  }

}
