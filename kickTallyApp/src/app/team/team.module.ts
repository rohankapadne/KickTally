import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { ChooseCountryComponent } from './components/choose-country/choose-country.component';


@NgModule({
  declarations: [ChooseCountryComponent],
  imports: [
    CommonModule,
    TeamRoutingModule
  ]
})
export class TeamModule { }
