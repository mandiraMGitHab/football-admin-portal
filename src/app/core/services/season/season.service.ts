import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as season from '../../../../assets/data/seasonlist.json';

@Injectable({
  providedIn: 'root',
})
export class SeasonService {
  constructor(private httpClient: HttpClient) {}

  getSeasons(): Observable<any> {
    var res = (season as any).default;
    return of(res);
  }
}
