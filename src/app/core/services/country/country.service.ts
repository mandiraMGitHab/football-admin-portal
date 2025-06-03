import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as countryData from '../../../../assets/data/countiesdropdown.json';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private httpClient: HttpClient) {}

  getCountries(): Observable<any> {
    var res = (countryData as any).default;
    return of(res);
  }
}
