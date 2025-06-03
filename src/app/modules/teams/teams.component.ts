import { Component, OnInit } from '@angular/core';
import { DropDownBindModel } from 'src/app/core/models/dropdownmodel';
import { Team } from 'src/app/core/models/Team/team';
import { CountryService } from 'src/app/core/services/country/country.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { StadiumService } from 'src/app/core/services/stadium/stadium.service';
import { TeamService } from 'src/app/core/services/team/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  countries!: DropDownBindModel[];
  teamTypes!: DropDownBindModel[];
  stadiums!: DropDownBindModel[];
  searchedTeams!: Team[];
  teams!: Team[];
  teamsData!: Team[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: number[] = [5, 10, 15];
  searchedTeam: string = '';
  searchedTextList: string[] = [];
  constructor(
    private teamService: TeamService,
    private countryService: CountryService,
    private stadiumService: StadiumService,
    private notifyService: NotificationService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.fetchCountries();
    this.fetchStadiums();
    this.fetchTeamypes();
    this.fetchTeams();
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
          5000
        );
      },
      (err) => console.error(err)
    );
  }

  fetchTeamypes() {
    this.teamTypes = [];
    this.teamService.getTeamType().subscribe(
      (data) => {
        data.forEach((item: any) => {
          let teamType = new DropDownBindModel();
          teamType.id = item.LOOKUPID;
          teamType.text = item.LOOKUP;
          this.teamTypes.push(teamType);
        });
        this.notifyService.showInfo(
          'Fetched all team types data!!',
          'Notification',
          5000
        );
      },
      (err) => console.error(err)
    );
  }

  fetchStadiums() {
    this.stadiums = [];
    this.stadiumService.getStadiums().subscribe(
      (data) => {
        data.forEach((item: any) => {
          let stadium = new DropDownBindModel();
          stadium.id = item.STADIUMID;
          stadium.text = item.STADIUMNAME;
          this.stadiums.push(stadium);
        });
        this.notifyService.showInfo(
          'Fetched all stadium data!!',
          'Notification',
          5000
        );
      },
      (err) => console.error(err)
    );
  }

  async fetchTeams() {
    this.teams = [];
    this.teamsData = [];
    await this.loaderService.waitFor(1500);
    this.teamService.getTeams().subscribe(
      (data) => {
        data.forEach((item: any) => {
          let team = new Team();
          team.teamId = item.teamId;
          team.teamText = item.teamText;
          team.teamCountryId = item.teamCountryId;
          team.teamCountryText = item.teamCountryText;
          team.teamTypeId = item.teamTypeId;
          team.teamTypeText = item.teamTypeText;
          team.teamStadiumId = item.teamStadiumId;
          team.teamStadiumText = item.teamStadiumText;
          team.isEdited = false;
          team.isNew = false;
          this.teams.push(team);
          this.searchedTextList.push(item.teamText);
        });
        this.notifyService.showInfo(
          'Fetched team data!!',
          'Notification',
          5000
        );
        this.teamsData = this.teams;
      },
      (err) => console.error(err)
    );
  }

  onAddTeam() {
    var newTeam = new Team();
    newTeam.isEdited = true;
    newTeam.isNew = true;
    this.teams.unshift(newTeam);
    this.page = 1;
  }

  onEditTeam(row: Team) {
    row.isEdited = true;
    console.log('Team edit clicked!!', JSON.stringify(row));
  }

  onUpdateTeam(row: Team) {
    if (row.isNew) {
      let indexToUpdate = this.teamsData.findIndex(
        (item) => item.teamId == row.teamId
      );
      const validIds = this.teamsData
        .map((item) => item.teamId)
        .filter((id) => id !== null && id !== undefined);
      var maxId = Math.max(...validIds);
      row.teamId = maxId + 1;
      row.isEdited = false;
      row.isNew = false;
      this.teamsData[indexToUpdate] = row;
      this.notifyService.showInfo(
        row.teamText + ' is added',
        'Notification',
        3000
      );
    } else {
      let indexToUpdate = this.teamsData.findIndex(
        (item) => item.teamId == row.teamId
      );
      row.isEdited = false;
      this.teamsData[indexToUpdate] = row;
      this.notifyService.showInfo(
        row.teamText + ' is updated',
        'Notification',
        3000
      );
    }
    this.searchedTextList.push(row.teamText);
    this.teams = this.teamsData;
  }

  onResetTeam(row: Team) {
    if (row.isNew) {
      let index = this.teams.findIndex((d) => d.teamId === row.teamId); //find index in your array
      this.teams.splice(index, 1); //remove element from array
    } else {
      row.isEdited = false;
    }
  }

  onDeleteTeam(row: Team) {
    this.searchedTextList.filter((item) => item !== row.teamText);
    this.teamsData = this.teamsData.filter(
      (item) => item.teamId !== row.teamId
    );
    this.teams = this.teamsData;
    this.notifyService.showInfo(
      row.teamText + ' is deleted',
      'Notification',
      3000
    );
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.searchTeam();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.searchTeam();
  }

  searchTeam(invokeGet?: boolean) {
    if (Object.keys(this.searchedTeam).length > 0) {
      console.log('User searched for -->', this.searchedTeam);
      this.searchedTeams = this.teamsData.filter(
        (team: Team) =>
          team.teamCountryText
            .toLowerCase()
            .includes(this.searchedTeam.toLowerCase()) ||
          team.teamText
            .toString()
            .toLowerCase()
            .includes(this.searchedTeam.toLowerCase())
      );
      console.log('Filtered teams are -->', this.searchedTeams);
      this.teams = this.searchedTeams;
    } else if (invokeGet) {
      this.fetchTeams();
    } else {
      this.teams = this.teamsData;
    }
  }

  countryChange(row: Team, selectedCountry: any) {
    console.log('Selected country is -->', selectedCountry);
    console.log('Selected row is -->', JSON.stringify(row));
    row.teamCountryId = selectedCountry.value.id;
    row.teamCountryText = this.countries.filter(
      (s) => s.id === selectedCountry.value.id
    )[0].text;
  }

  teamTypeChange(row: Team, selectedType: any) {
    console.log('Selected Team type is -->', selectedType);
    console.log('Selected row is -->', JSON.stringify(row));
    row.teamTypeId = selectedType.value.id;
    row.teamTypeText = this.teamTypes.filter(
      (s) => s.id === selectedType.value.id
    )[0].text;
  }

  teamStadiumChange(row: Team, selectedStadium: any) {
    row.teamStadiumId = selectedStadium.value.id;
    row.teamStadiumText = this.stadiums.filter(
      (s) => s.id === selectedStadium.value.id
    )[0].text;
  }
}
