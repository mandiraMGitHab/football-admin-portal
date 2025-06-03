import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as listOfStadium from '../../../../assets/data/getstadiumlist.json';

@Injectable({
  providedIn: 'root',
})
export class StadiumService {
  constructor(private httpClient: HttpClient) {}

  getStadiums(): Observable<any> {
    var res = (listOfStadium as any).default;
    return of(res);
  }
}
