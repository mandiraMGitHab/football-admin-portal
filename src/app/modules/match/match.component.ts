import { Component, OnInit } from '@angular/core';
import { DropDownBindModel } from 'src/app/core/models/dropdownmodel';
import { MatchDetails } from 'src/app/core/models/match/match';
import { MatchService } from 'src/app/core/services/match/match.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import * as _moment from 'moment';
import { DatePipe } from '@angular/common';
import { LoaderService } from 'src/app/core/services/loader/loader.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent implements OnInit {
  searchedMatches!: MatchDetails[];
  matches!: MatchDetails[];
  dataMatches!: MatchDetails[];
  seasons!: DropDownBindModel[];
  selectedSeason!: DropDownBindModel;
  countries!: DropDownBindModel[];
  selectedCountry!: DropDownBindModel;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: number[] = [5, 10, 15];
  searchedText: string = '';
  searchedTextList: string[] = [];
  constructor(
    private matchService: MatchService,
    private notifyService: NotificationService,
    private loaderService: LoaderService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.fetchMatches();
  }

  async fetchMatches() {
    this.matches = [];
    await this.loaderService.waitFor(1500);
    this.matchService.getMatchDetails().subscribe(
      (data) => {
        data.forEach((item: any) => {
          let match = new MatchDetails();
          match.matchId = item.matchId;
          match.matchDate =
            this.datePipe.transform(item.matchDate, 'yyyy-MM-dd') || '';
          match.matchTime = item.matchTime;
          match.tournamentId = item.tournamentId;
          match.tournamentName = item.tournamentName;
          match.homeTeamId = item.homeTeamId;
          match.homeTeamName = item.homeTeamName;
          match.homeTeamScore = item.homeTeamScore;
          match.awayTeamId = item.awayTeamId;
          match.awayTeamName = item.awayTeamName;
          match.awayTeamScore = item.awayTeamScore;
          match.referee = item.referee;
          match.asst_Referee_1 = item.asst_Referee_1;
          match.asst_Referee_2 = item.asst_Referee_2;
          match.fourth_Official = item.fourth_Official;
          match.stadiumId = item.stadiumId;
          match.stadiumName = item.stadiumName;
          match.status = item.status;
          match.round = item.round;
          match.groupStage = item.groupStage;
          match.attendance = item.attendance;
          match.video_Fps = item.video_Fps;
          this.matches.push(match);
        });
        this.notifyService.showInfo(
          'Fetched all match data!!',
          'Notification',
          5000
        );
      },
      (err) => console.error(err)
    );
  }

  onEditMatchDetails(row: MatchDetails) {
    row.isEdited = true;
  }

  onResetMatchDetails(row: MatchDetails) {
    if (row.isNew) {
      let index = this.matches.findIndex((d) => d.matchId === row.matchId);
      this.matches.splice(index, 1);
    } else {
      row.isEdited = false;
    }
  }
  onTableDataChange(event: any) {
    this.page = event;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  async onUpdateMatchDetails(row: MatchDetails) {
    await this.loaderService.waitFor(500);
    if (row.isNew) {
      let indexToUpdate = this.dataMatches.findIndex(
        (item) => item.matchId == row.matchId
      );
      const validIds = this.dataMatches
        .map((item) => item.matchId)
        .filter((id) => id !== null && id !== undefined);
      var maxId = Math.max(...validIds);
      row.matchId = maxId + 1;
      row.isEdited = false;
      row.isNew = false;
      this.dataMatches[indexToUpdate] = row;
      this.notifyService.showInfo(
        'Match is added to the List',
        'Notification',
        3000
      );
    } else {
      let indexToUpdate = this.dataMatches.findIndex(
        (item) => item.matchId == row.matchId
      );
      row.isEdited = false;
      this.dataMatches[indexToUpdate] = row;
      this.notifyService.showInfo(' Match is updated', 'Notification', 3000);
    }
    this.matches = this.dataMatches;
  }

  async onDeleteMatchDetails(row: MatchDetails) {
    await this.loaderService.waitFor(500);
    this.dataMatches = this.dataMatches.filter(
      (item) => item.matchId !== row.matchId
    );
    this.matches = this.dataMatches;
    this.notifyService.showInfo(' is deleted', 'Notification', 3000);
  }
  onAddMatchDetails() {
    var newMatch = new MatchDetails();
    newMatch.isEdited = true;
    newMatch.isNew = true;
    this.matches.unshift(newMatch);
    this.page = 1;
  }
}
