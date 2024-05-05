import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-country',
  templateUrl: './choose-country.component.html',
  styleUrls: ['./choose-country.component.scss']
})
export class ChooseCountryComponent implements OnInit {

  countries = [
    {
      name: "England",
      code: "GB",
      flag: "https://media.api-sports.io/flags/gb.svg"
    },
    {
      name: "Spain",
      code: "ES",
      flag: "https://media.api-sports.io/flags/es.svg"
    },
    {
      name: "France",
      code: "FR",
      flag: "https://media.api-sports.io/flags/fr.svg"
    },
    {
      name: "Germany",
      code: "DE",
      flag: "https://media.api-sports.io/flags/de.svg"
    },
    {
      name: "Italy",
      code: "IT",
      flag: "https://media.api-sports.io/flags/it.svg"
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  selectCountry(country: any) {
    console.log("country ",country)
  }

}
