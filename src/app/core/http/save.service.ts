import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { SaveModel } from '../models/save.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Array<SaveModel>> {
    return this.http.get(`${environment.baseUrl}/saves`).pipe(
      map((resp: any) => resp.data.map(data => new SaveModel(data)))
    );
  }

  sumTotalSaves(): Observable<number> {
    return this.http.get(`${environment.baseUrl}/saves/sum-total-saves`).pipe(
      map((resp: any) => resp.data)
    );
  }

}
