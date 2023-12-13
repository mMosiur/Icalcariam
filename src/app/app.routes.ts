import {Routes} from '@angular/router';
import {HappinessComponent} from "./components/happiness/happiness.component";
import {ResearchComponent} from "./components/research/research.component";
import {BuildingsComponent} from "./components/buildings/buildings.component";
import {GeneralComponent} from "./components/general/general.component";

export const routes: Routes = [
  {path: 'happiness', component: HappinessComponent},
  {path: 'research', component: ResearchComponent},
  {path: 'buildings', component: BuildingsComponent},
  {path: 'settings', component: GeneralComponent},
  {path: '**', redirectTo: '/happiness', pathMatch: 'full'}
];
