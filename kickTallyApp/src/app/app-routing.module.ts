import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseCountryComponent } from './team/components/choose-country/choose-country.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./team/team.module').then(m => m.TeamModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
