import {FormsModule} from '@angular/forms';
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResearchInfoService} from "../../services/research-info.service";
import {ResearchComponent} from "../research/research.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {Observable, of, switchMap} from "rxjs";

@Component({
  selector: 'app-happiness',
  standalone: true,
  imports: [CommonModule, FormsModule, ResearchComponent, TranslateModule],
  templateUrl: './happiness.component.html',
  styleUrl: './happiness.component.css',
})
export class HappinessComponent {
  initialHappiness: number | null;
  currentPopulation: number | null;
  townCapacity: number | null;
  time: number | null;

  get maxPopulation(): number | null {
    if (this.initialHappiness === null || this.currentPopulation === null) {
      return null;
    }
    return this.initialHappiness + this.currentPopulation;
  }

  get timeBeforeFilled(): number | null {
    if (
      this.initialHappiness === null ||
      this.currentPopulation === null ||
      this.townCapacity === null
    ) {
      return null;
    }
    const finalHappiness =
      this.initialHappiness + this.currentPopulation - this.townCapacity;
    if (finalHappiness > 0) {
      return Math.max(0, 50 * Math.log(this.initialHappiness / finalHappiness));
    } else {
      return Number.POSITIVE_INFINITY;
    }
  }

  get timeBeforeFilledText(): Observable<string> {
    return of(this.timeBeforeFilled).pipe(
      switchMap(tbf => {
        if (tbf === null) {
          return of('—');
        } else if (tbf === Number.POSITIVE_INFINITY) {
          return this.translateService.get('TABS.POPULATION.WILL_NEVER_FILL', {maxPopulation: this.maxPopulation});
        } else {
          return of(tbf.toFixed(2));
        }
      })
    );
  }

  get populationAfterTime(): number | null {
    if (
      this.time === null ||
      this.initialHappiness === null ||
      this.currentPopulation === null
    ) {
      return null;
    }
    const p0 = this.currentPopulation;
    const h0 = this.initialHappiness;
    return p0 + h0 * (1 - Math.exp(-this.time / 50));
  }

  constructor(protected researchInfoService: ResearchInfoService, private translateService: TranslateService) {
    this.initialHappiness = null;
    this.currentPopulation = null;
    this.townCapacity = null;
    this.time = null;
  }
}
