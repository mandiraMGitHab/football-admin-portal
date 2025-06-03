import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as playerAllData from '../../../../assets/data/getAllPlayers.json';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private httpClient: HttpClient) {}

  getPlayers(): Observable<any> {
    var res = (playerAllData as any).default;
    return of(res);
  }
}
