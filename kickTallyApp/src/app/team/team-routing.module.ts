import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseCountryComponent } from './components/choose-country/choose-country.component';

const routes: Routes = [
  {
    path: '',
    component: ChooseCountryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
