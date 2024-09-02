import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { ChooseCountryComponent } from './components/choose-country/choose-country.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ToasterComponent } from './components/toaster/toaster.component';


@NgModule({
  declarations: [ChooseCountryComponent, LoaderComponent, ToasterComponent],
  imports: [
    CommonModule,
    TeamRoutingModule
  ]
})
export class TeamModule { }
