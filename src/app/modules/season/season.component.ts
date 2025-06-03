import { Component, OnInit } from '@angular/core';
import { Season } from 'src/app/core/models/Season/season';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { SeasonService } from 'src/app/core/services/season/season.service';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss'],
})
export class SeasonComponent implements OnInit {
  seasons!: Season[];
  //searchedSeasons!: Season[];
  dataSeasons!: Season[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: number[] = [5, 10, 15];
  searchedSeason: string = '';
  searchedSeasonDD!: Season;

  constructor(
    private seasonService: SeasonService,
    private notifyService: NotificationService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.fetchSeasons();
  }

  async fetchSeasons(checkfilter?: boolean) {
    this.seasons = [];
    this.dataSeasons = [];
    await this.loaderService.waitFor(1500);
    this.seasonService.getSeasons().subscribe(
      (data) => {
        data.forEach((item: any) => {
          let season = new Season();
          season.seasonId = item.SEASONID;
          season.seasonText = item.SEASONNAME;
          season.isEdited = false;
          season.isNew = false;
          this.seasons.push(season);
        });
        this.notifyService.showInfo(
          'Fetched season data!!',
          'Notification',
          5000
        );
        this.dataSeasons = this.seasons;
        if (checkfilter) this.seasonChange(null);
      },
      (err) => console.error(err)
    );
  }

  onAddSeason() {
    var newSeason = new Season();
    newSeason.isEdited = true;
    newSeason.isNew = true;
    this.seasons.unshift(newSeason);
    this.page = 1;
  }

  onEditSeason(row: Season) {
    row.isEdited = true;
    console.log('Season edit clicked!!', JSON.stringify(row));
  }

  async onUpdateSeason(row: Season) {
    this.searchedSeasonDD = row;
    await this.loaderService.waitFor(500);
    if (row.isNew) {
      let indexToUpdate = this.dataSeasons.findIndex(
        (item) => item.seasonId == row.seasonId
      );
      const validIds = this.dataSeasons
        .map((item) => item.seasonId)
        .filter((id) => id !== null && id !== undefined);
      var maxId = Math.max(...validIds);
      row.seasonId = maxId + 1;
      row.isEdited = false;
      row.isNew = false;
      this.dataSeasons[indexToUpdate] = row;
      this.notifyService.showInfo(
        row.seasonText + ' is added to season data',
        'Notification',
        3000
      );
    } else {
      let indexToUpdate = this.dataSeasons.findIndex(
        (item) => item.seasonId == row.seasonId
      );
      row.isEdited = false;
      this.dataSeasons[indexToUpdate] = row;
      this.notifyService.showInfo(
        row.seasonText + ' is updated',
        'Notification',
        3000
      );
    }
    this.seasons = this.dataSeasons;
  }

  onResetSeason(row: Season) {
    if (row.isNew) {
      let index = this.seasons.findIndex((d) => d.seasonId === row.seasonId); //find index in your array
      this.seasons.splice(index, 1); //remove element from array
    } else {
      row.isEdited = false;
    }
  }

  async onDeleteSeason(row: Season) {
    await this.loaderService.waitFor(500);
    this.dataSeasons = this.dataSeasons.filter(
      (item) => item.seasonId !== row.seasonId
    );
    this.seasons = this.dataSeasons;
    this.notifyService.showInfo(
      row.seasonText + ' is deleted',
      'Notification',
      3000
    );
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  seasonChange(data: any) {
    if (data != null && Object.keys(data.value).length > 0) {
      this.seasons = this.dataSeasons.filter((season: Season) =>
        season.seasonText.includes(data.value.seasonText)
      );
    } else if (Object.keys(this.searchedSeasonDD).length > 0) {
      this.seasons = this.dataSeasons.filter((season: Season) =>
        season.seasonText
          .toLowerCase()
          .includes(this.searchedSeasonDD.seasonText.toLowerCase())
      );
    } else {
      this.seasons = this.dataSeasons;
    }
  }
}
