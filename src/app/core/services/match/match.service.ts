import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as matchAllData from '../../../../assets/data/getListOfMatch.json';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  constructor(private httpClient: HttpClient) {}

  getMatchDetails(): Observable<any> {
    var res = (matchAllData as any).default;
    return of(res);
  }
}
