import { Component, OnInit } from '@angular/core';
import { DropDownBindModel } from 'src/app/core/models/dropdownmodel';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { SquadService } from 'src/app/core/services/squad/squad.service';
import { Squad } from 'src/app/core/models/squad/squad';
import { LoaderService } from 'src/app/core/services/loader/loader.service';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.scss'],
})
export class SquadComponent implements OnInit {
  player_Squads!: Squad[];
  dataPlayer_Squads!: Squad[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: number[] = [5, 10, 15];
  searchedText: string = '';
  countries!: DropDownBindModel[];
  selectedCountry!: DropDownBindModel;
  seasons!: DropDownBindModel[];
  selectedSeason!: DropDownBindModel;
  displayTournament!: DropDownBindModel[];
  selectedTournament!: DropDownBindModel;

  constructor(
    private squadService: SquadService,
    private notifyService: NotificationService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.fetchSquads();
  }

  async fetchSquads(checkfilter?: boolean) {
    this.player_Squads = [];
    this.dataPlayer_Squads = [];
    await this.loaderService.waitFor(1500);
    this.squadService.getSquad().subscribe(
      (data) => {
        data.forEach((item: any) => {
          let squad = new Squad();
          squad.squadId = item.squadId;
          squad.playerText = item.playerText;
          squad.playerJerseyNo = item.playerJerseyNo;
          squad.tournamentText = item.tournamentText;
          squad.tournamentSeasonText = item.tournamentSeasonText;
          squad.teamText = item.teamText;
          squad.isEdited = false;
          squad.isNew = false;
          this.player_Squads.push(squad);
        });
        this.notifyService.showInfo(
          'Fetched country data!!',
          'Notification',
          5000
        );
        this.dataPlayer_Squads = this.player_Squads;
      },
      (err) => console.error(err)
    );
  }

  onEditPlayerToTeam(row: Squad) {
    row.isEdited = true;
  }
  onTableDataChange(event: any) {
    this.page = event;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  async onUpdatePlayerToTeam(row: Squad) {
    await this.loaderService.waitFor(500);
    if (row.isNew) {
      let indexToUpdate = this.dataPlayer_Squads.findIndex(
        (item) => item.playerId == row.playerId
      );
      const validIds = this.dataPlayer_Squads
        .map((item) => item.playerId)
        .filter((id) => id !== null && id !== undefined);
      var maxId = Math.max(...validIds);
      row.playerId = maxId + 1;
      row.isEdited = false;
      row.isNew = false;
      this.dataPlayer_Squads[indexToUpdate] = row;
      this.notifyService.showInfo(
        row.playerText + ' is added to Player List',
        'Notification',
        3000
      );
    } else {
      let indexToUpdate = this.dataPlayer_Squads.findIndex(
        (item) => item.playerId == row.playerId
      );
      row.isEdited = false;
      this.dataPlayer_Squads[indexToUpdate] = row;
      this.notifyService.showInfo(
        row.playerText + ' Player is updated',
        'Notification',
        3000
      );
    }
    this.player_Squads = this.dataPlayer_Squads;
  }
  onResetPlayerToTeam(row: Squad) {
    if (row.isNew) {
      let index = this.player_Squads.findIndex(
        (d) => d.squadId === row.squadId
      ); //find index in your array
      this.player_Squads.splice(index, 1); //remove element from array
    } else {
      row.isEdited = false;
    }
  }

  async onDeletePlayerToTeam(row: Squad) {
    await this.loaderService.waitFor(500);
    this.dataPlayer_Squads = this.dataPlayer_Squads.filter(
      (item) => item.playerId !== row.playerId
    );
    this.player_Squads = this.dataPlayer_Squads;
    this.notifyService.showInfo(
      row.playerText + ' is deleted',
      'Notification',
      3000
    );
  }
}
