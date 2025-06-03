import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as teamTypes from '../../../../assets/data/teamtype.json';
import * as listOfTeams from '../../../../assets/data/getteamlist.json';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private httpClient: HttpClient) {}
  getTeams(): Observable<any> {
    var res = (listOfTeams as any).default;
    return of(res);
  }

  getTeamType(): Observable<any> {
    var res = (teamTypes as any).default;
    return of(res);
  }
}
