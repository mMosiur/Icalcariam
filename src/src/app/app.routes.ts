import {Routes} from '@angular/router';
import {BasicCalculatorComponent} from './pages/basic-calculator/basic-calculator.component';
import {ResearchComponent} from "./components/research/research.component";

export const routes: Routes = [
  {path: 'happiness', component: BasicCalculatorComponent},
  {path: 'research', component: ResearchComponent},
  {path: '**', redirectTo: '/happiness', pathMatch: 'full'}
];
