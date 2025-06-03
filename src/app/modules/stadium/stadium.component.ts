import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { Stadium } from 'src/app/core/models/stadium/stadium';
import { StadiumService } from 'src/app/core/services/stadium/stadium.service';
import { DropDownBindModel } from 'src/app/core/models/dropdownmodel';
import { CountryService } from 'src/app/core/services/country/country.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';

@Component({
  selector: 'app-stadium',
  templateUrl: './stadium.component.html',
  styleUrls: ['./stadium.component.scss'],
})
export class StadiumComponent implements OnInit {
  countries!: DropDownBindModel[];
  stadiums!: Stadium[];
  dataStadiums!: Stadium[];
  searchedStadiums!: Stadium[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: number[] = [5, 10, 15];
  searchedStadium: string = '';
  searchedTextList: string[] = [];

  constructor(
    private stadiumService: StadiumService,
    private countryService: CountryService,
    private notifyService: NotificationService,
    private loaderService: LoaderService
  ) {}

  async ngOnInit() {
    this.fetchCountries();
    await this.loaderService.waitFor(1500);
    this.fetchStadiums();
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

  fetchStadiums() {
    this.stadiums = [];
    this.dataStadiums = [];
    this.stadiumService.getStadiums().subscribe(
      (data) => {
        data.forEach((item: any) => {
          let countryName =
            this.countries !== undefined
              ? this.countries.find((cou) => cou.id == item.COUNTRYID)?.text
              : '';
          let stadium = new Stadium();
          stadium.stadiumId = item.STADIUMID;
          stadium.stadiumName = item.STADIUMNAME;
          stadium.stadiumCountryId = parseInt(item.COUNTRYID);
          stadium.stadiumCountryText =
            countryName !== undefined ? countryName : '';
          stadium.capacity = item.capacity;
          stadium.isEdited = false;
          stadium.isNew = false;
          this.stadiums.push(stadium);
          this.searchedTextList.push(item.STADIUMNAME);
        });
        this.notifyService.showInfo(
          'Fetched stadium data!!',
          'Notification',
          5000
        );
        this.dataStadiums = this.stadiums;
      },
      (err) => console.error(err)
    );
  }

  onAddStadium() {
    var newStadium = new Stadium();
    newStadium.isEdited = true;
    newStadium.isNew = true;
    this.stadiums.unshift(newStadium);
    this.page = 1;
  }

  onEditStadium(row: Stadium) {
    row.isEdited = true;
    console.log('Stadium edit clicked!!', JSON.stringify(row));
  }

  async onUpdateStadium(row: Stadium) {
    await this.loaderService.waitFor(500);
    if (row.isNew) {
      let indexToUpdate = this.dataStadiums.findIndex(
        (item) => item.stadiumId == row.stadiumId
      );
      const validIds = this.dataStadiums
        .map((item) => item.stadiumId)
        .filter((id) => id !== null && id !== undefined);
      var maxId = Math.max(...validIds);
      row.stadiumId = maxId + 1;
      row.isEdited = false;
      row.isNew = false;
      this.dataStadiums[indexToUpdate] = row;
      this.notifyService.showInfo(
        row.stadiumName + ' is added',
        'Notification',
        3000
      );
    } else {
      let indexToUpdate = this.dataStadiums.findIndex(
        (item) => item.stadiumId == row.stadiumId
      );
      row.isEdited = false;
      this.dataStadiums[indexToUpdate] = row;
      this.notifyService.showInfo(
        row.stadiumName + ' is updated',
        'Notification',
        3000
      );
    }
    this.stadiums = this.dataStadiums;
  }

  onResetStadium(row: Stadium) {
    if (row.isNew) {
      let index = this.stadiums.findIndex((d) => d.stadiumId === row.stadiumId); //find index in your array
      this.stadiums.splice(index, 1); //remove element from array
    } else {
      row.isEdited = false;
    }
  }

  async onDeleteStadium(row: Stadium) {
    await this.loaderService.waitFor(500);
    this.dataStadiums = this.dataStadiums.filter(
      (item) => item.stadiumId !== row.stadiumId
    );
    this.stadiums = this.dataStadiums;
    this.notifyService.showInfo(
      row.stadiumName + ' is deleted',
      'Notification',
      3000
    );
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.searchStadium();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.searchStadium();
  }

  searchStadium(invokeGet?: boolean) {
    if (Object.keys(this.searchedStadium).length > 0) {
      this.searchedStadiums = this.dataStadiums.filter(
        (stadium: Stadium) =>
          stadium.stadiumName
            .toLowerCase()
            .includes(this.searchedStadium.toLowerCase()) ||
          stadium.stadiumCountryText
            .toLowerCase()
            .includes(this.searchedStadium.toLowerCase())
      );
      this.stadiums = this.searchedStadiums;
    } else if (invokeGet) {
      this.fetchStadiums();
    } else {
      this.stadiums = this.dataStadiums;
    }
  }

  countryChange(row: Stadium, selectedCountry: any) {
    console.log('Selected country is -->', selectedCountry);
    console.log('Selected row is -->', JSON.stringify(row));
    row.stadiumCountryId = selectedCountry.value.id;
    row.stadiumCountryText = this.countries.filter(
      (s) => s.id === selectedCountry.value.id
    )[0].text;
  }
}
