import { Component, OnInit } from '@angular/core';
import { DropDownBindModel } from 'src/app/core/models/dropdownmodel';
import { Tournament } from 'src/app/core/models/tournament/tournament';
import { CountryService } from 'src/app/core/services/country/country.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { SeasonService } from 'src/app/core/services/season/season.service';
import { TournamentService } from 'src/app/core/services/tournament/tournament.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss'],
})
export class TournamentComponent implements OnInit {
  seasons!: DropDownBindModel[];
  countries!: DropDownBindModel[];
  tournamentTypes!: DropDownBindModel[];
  searchedTournaments!: Tournament[];
  tournaments!: Tournament[];
  dataTournaments!: Tournament[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: number[] = [5, 10, 15];
  searchedTournament: string = '';
  searchedTextList: string[] = [];
  constructor(
    private tournamentService: TournamentService,
    private seasonService: SeasonService,
    private countryService: CountryService,
    private notifyService: NotificationService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.fetchSeasons();
    this.fetchCountries();
    this.fetchTournamentTypes();
    this.fetchTournaments();
  }

  fetchSeasons() {
    this.seasons = [];
    this.seasonService.getSeasons().subscribe(
      (data) => {
        data.forEach((item: any) => {
          let season = new DropDownBindModel();
          season.id = item.SEASONID;
          season.text = item.SEASONNAME;
          this.seasons.push(season);
          this.searchedTextList.push(item.SEASONNAME);
        });
        this.notifyService.showInfo(
          'Fetched all season data!!',
          'Notification',
          2000
        );
      },
      (err) => console.error(err)
    );
  }

  fetchCountries() {
    this.countries = [];
    this.countryService.getCountries().subscribe(
      (data) => {
        data.forEach((item: any) => {
          let country = new DropDownBindModel();
          country.id = parseInt(item.ID);
          country.text = item.Name;
          this.countries.push(country);
          this.searchedTextList.push(item.Name);
        });
        this.notifyService.showInfo(
          'Fetched all country data!!',
          'Notification',
          2000
        );
      },
      (err) => console.error(err)
    );
  }

  fetchTournamentTypes() {
    this.tournamentTypes = [];
    this.tournamentService.getTournamentType().subscribe(
      (data) => {
        data.forEach((item: any) => {
          let tournamentType = new DropDownBindModel();
          tournamentType.id = item.LOOKUPID;
          tournamentType.text = item.LOOKUP;
          this.tournamentTypes.push(tournamentType);
        });
        this.notifyService.showInfo(
          'Fetched all tournament types data!!',
          'Notification',
          2000
        );
      },
      (err) => console.error(err)
    );
  }

  async fetchTournaments() {
    this.tournaments = [];
    this.dataTournaments = [];
    let tournamentText: string[] = [];
    await this.loaderService.waitFor(1500);
    this.tournamentService.getTournament().subscribe(
      (data) => {
        data.forEach((item: any) => {
          let tournament = new Tournament();
          tournament.tournamentId = item.tournamentId;
          tournament.tournamentText = item.tournamentText;
          tournament.tournamentCountryId = item.tournamentCountryId;
          tournament.tournamentCountryText = item.tournamentCountryText;
          tournament.tournamentSeasonId = item.tournamentSeasonId;
          tournament.tournamentSeasonText = item.tournamentSeasonText;
          tournament.tournamentSeasonStart = item.tournamentSeasonStart;
          tournament.tournamentSeasonEnd = item.tournamentSeasonEnd;
          tournament.tournamentTypeId = item.tournamentTypeId;
          tournament.tournamentTypeText = item.tournamentTypeText;
          tournament.no_of_teams = item.no_of_teams;
          tournament.isEdited = false;
          tournament.isNew = false;
          this.tournaments.push(tournament);
          if (tournamentText.indexOf(item.tournamentText) === -1)
            tournamentText.push(item.tournamentText);
        });
        this.notifyService.showInfo(
          'Fetched tournament data!!',
          'Notification',
          2000
        );
        this.searchedTextList = this.searchedTextList.concat(tournamentText);
        this.dataTournaments = this.tournaments;
      },
      (err) => console.error(err)
    );
  }

  onAddTournament() {
    var newTournament = new Tournament();
    newTournament.isEdited = true;
    newTournament.isNew = true;
    this.tournaments.unshift(newTournament);
    this.page = 1;
  }

  onEditTournament(row: Tournament) {
    row.isEdited = true;
    console.log('Tournament edit clicked!!', JSON.stringify(row));
  }

  onUpdateTournament(row: Tournament) {
    if (row.isNew) {
      let indexToUpdate = this.dataTournaments.findIndex(
        (item) => item.tournamentId == row.tournamentId
      );
      const validIds = this.dataTournaments
        .map((item) => item.tournamentId)
        .filter((id) => id !== null && id !== undefined);
      var maxId = Math.max(...validIds);
      row.tournamentId = maxId + 1;
      row.isEdited = false;
      row.isNew = false;
      this.dataTournaments[indexToUpdate] = row;
      this.notifyService.showInfo(
        row.tournamentText + ' is added',
        'Notification',
        3000
      );
    } else {
      let indexToUpdate = this.dataTournaments.findIndex(
        (item) => item.tournamentId == row.tournamentId
      );
      row.isEdited = false;
      this.searchedTextList = this.searchedTextList.filter(
        (item) => item !== this.dataTournaments[indexToUpdate].tournamentText
      );
      this.dataTournaments[indexToUpdate] = row;
      this.notifyService.showInfo(
        row.tournamentText + ' is updated',
        'Notification',
        3000
      );
    }
    this.searchedTextList.push(row.tournamentText);
    this.tournaments = this.dataTournaments;
  }

  onResetTournament(row: Tournament) {
    if (row.isNew) {
      let index = this.tournaments.findIndex(
        (d) => d.tournamentId === row.tournamentId
      ); //find index in your array
      this.tournaments.splice(index, 1); //remove element from array
    } else {
      row.isEdited = false;
    }
  }

  onDeleteTournament(row: Tournament) {
    this.searchedTextList = this.searchedTextList.filter(
      (item) => item !== row.tournamentText
    );
    this.dataTournaments = this.dataTournaments.filter(
      (item) => item.tournamentId !== row.tournamentId
    );
    this.tournaments = this.dataTournaments;
    this.notifyService.showInfo(
      row.tournamentText + ' is deleted',
      'Notification',
      3000
    );
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.searchTournament();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.searchTournament();
  }

  seasonChange(row: Tournament, selectedTournament: any) {
    console.log('Selected tournament is -->', selectedTournament);
    console.log('Selected row is -->', JSON.stringify(row));
    row.tournamentSeasonId = selectedTournament.value.id;
    row.tournamentSeasonText = this.seasons.filter(
      (s) => s.id === selectedTournament.value.id
    )[0].text;
  }

  countryChange(row: Tournament, selectedCountry: any) {
    console.log('Selected country is -->', selectedCountry);
    console.log('Selected row is -->', JSON.stringify(row));
    row.tournamentCountryId = selectedCountry.value.id;
    row.tournamentCountryText = this.countries.filter(
      (s) => s.id === selectedCountry.value.id
    )[0].text;
  }

  tournamentTypeChange(row: Tournament, selectedType: any) {
    console.log('Selected tournament type is -->', selectedType);
    console.log('Selected row is -->', JSON.stringify(row));
    row.tournamentTypeId = selectedType.value.id;
    row.tournamentTypeText = this.tournamentTypes.filter(
      (s) => s.id === selectedType.value.id
    )[0].text;
  }

  searchTournament() {
    if (Object.keys(this.searchedTournament).length > 0) {
      this.searchedTournaments = this.dataTournaments.filter(
        (tournament: Tournament) =>
          tournament.tournamentCountryText
            .toLowerCase()
            .includes(this.searchedTournament.toLowerCase()) ||
          tournament.tournamentText
            .toString()
            .toLowerCase()
            .includes(this.searchedTournament.toLowerCase()) ||
          tournament.tournamentSeasonText
            .toString()
            .toLowerCase()
            .includes(this.searchedTournament.toLowerCase())
      );
      this.tournaments = this.searchedTournaments;
    } else {
      this.tournaments = this.dataTournaments;
    }
  }
}
