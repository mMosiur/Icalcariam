import {Routes} from '@angular/router';
import {HappinessComponent} from "./components/happiness/happiness.component";
import {ResearchComponent} from "./components/research/research.component";

export const routes: Routes = [
  {path: 'happiness', component: HappinessComponent},
  {path: 'research', component: ResearchComponent},
  {path: '**', redirectTo: '/happiness', pathMatch: 'full'}
];
