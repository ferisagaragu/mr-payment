import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetaInfService {

  constructor(private http: HttpClient) { }

  getVersion(): Observable<string> {
    return this.http.get(`${environment.baseUrl}/meta-infos/version`)
      .pipe(map((resp: any) => resp.message));
  }

}
