import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as squadData from '../../../../assets/data/getAllSquads.json';

@Injectable({
  providedIn: 'root',
})
export class SquadService {
  constructor(private httpClient: HttpClient) {}

  getSquad(): Observable<any> {
    var res = (squadData as any).default;
    return of(res);
  }
}
