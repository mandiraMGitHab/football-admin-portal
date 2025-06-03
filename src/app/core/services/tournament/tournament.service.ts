import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as tournamentType from '../../../../assets/data/tournamenttype.json';
import * as tournamentList from '../../../../assets/data/tournamentlist.json';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  constructor(private httpClient: HttpClient) {}

  getTournament(): Observable<any> {
    var res = (tournamentList as any).default;
    return of(res);
  }

  getTournamentType(): Observable<any> {
    var res = (tournamentType as any).default;
    return of(res);
  }
}
