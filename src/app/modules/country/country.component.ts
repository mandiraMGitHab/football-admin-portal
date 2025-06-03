import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/core/services/country/country.service';
import { Country } from 'src/app/core/models/Country/country';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  countries!: Country[];
  dataCountries!: Country[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: number[] = [5, 10, 15];
  searchedCountryDD!: Country;

  constructor(
    private countryService: CountryService,
    private notifyService: NotificationService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.fetchCountries();
  }

  async fetchCountries(checkfilter?: boolean) {
    this.countries = [];
    this.dataCountries = [];
    await this.loaderService.waitFor(1500);
    this.countryService.getCountries().subscribe(
      (data) => {
        data.forEach((item: any) => {
          let country = new Country();
          country.CountryId = item.ID;
          country.CountryName = item.Name;
          country.CountryCode = item.Description;
          country.isEdited = false;
          country.isNew = false;
          this.countries.push(country);
        });
        this.notifyService.showInfo(
          'Fetched country data!!',
          'Notification',
          5000
        );
        this.dataCountries = this.countries;
        if (checkfilter) this.countryChange(null);
      },
      (err) => console.error(err)
    );
  }

  onAddCountry() {
    var newCountry = new Country();
    newCountry.isEdited = true;
    newCountry.isNew = true;
    this.countries.unshift(newCountry);
    this.page = 1;
  }

  onEditCountry(row: Country) {
    row.isEdited = true;
  }

  async onUpdateCountry(row: Country) {
    this.searchedCountryDD = row;
    await this.loaderService.waitFor(500);
    if (row.isNew) {
      let indexToUpdate = this.dataCountries.findIndex(
        (item) => item.CountryId == row.CountryId
      );
      const validIds = this.dataCountries
        .map((item) => item.CountryId)
        .filter((id) => id !== null && id !== undefined);
      var maxId = Math.max(...validIds);
      row.CountryId = maxId + 1;
      row.isEdited = false;
      row.isNew = false;
      this.dataCountries[indexToUpdate] = row;
      this.notifyService.showInfo(
        row.CountryName + ' is added to country',
        'Notification',
        3000
      );
    } else {
      let indexToUpdate = this.dataCountries.findIndex(
        (item) => item.CountryId == row.CountryId
      );
      row.isEdited = false;
      this.dataCountries[indexToUpdate] = row;
      this.notifyService.showInfo(
        row.CountryName + ' is updated',
        'Notification',
        3000
      );
    }
    this.countries = this.dataCountries;
  }

  onResetCountry(row: Country) {
    if (row.isNew) {
      let index = this.countries.findIndex(
        (d) => d.CountryId === row.CountryId
      ); //find index in your array
      this.countries.splice(index, 1); //remove element from array
    } else {
      row.isEdited = false;
    }
  }

  async onDeleteCountry(row: Country) {
    await this.loaderService.waitFor(500);
    this.dataCountries = this.dataCountries.filter(
      (item) => item.CountryId !== row.CountryId
    );
    this.countries = this.dataCountries;
    this.notifyService.showInfo(
      row.CountryName + ' is deleted',
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

  countryChange(data: any) {
    if (data != null && Object.keys(data.value).length > 0) {
      this.countries = this.dataCountries.filter((country: Country) =>
        country.CountryName.includes(data.value.CountryName)
      );
    } else if (Object.keys(this.searchedCountryDD).length > 0) {
      this.countries = this.dataCountries.filter((country: Country) =>
        country.CountryName.toLowerCase().includes(
          this.searchedCountryDD.CountryName.toLowerCase()
        )
      );
    } else {
      this.countries = this.dataCountries;
    }
  }
}
