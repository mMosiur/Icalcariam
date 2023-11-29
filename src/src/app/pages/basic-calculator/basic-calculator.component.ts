import {FormsModule} from '@angular/forms';
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResearchInfoService} from "../../services/research-info.service";
import {EconomyResearch, MilitaryResearch, ScienceResearch, SeafaringResearch} from "../../models/research";
import {ResearchComponent} from "../../components/research/research.component";

@Component({
  selector: 'app-basic-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, ResearchComponent],
  templateUrl: './basic-calculator.component.html',
  styleUrl: './basic-calculator.component.css',
})
export class BasicCalculatorComponent {
  initialHappiness: number | null;
  currentPopulation: number | null;
  townCapacity: number | null;
  time: number | null;

  get maxPopulation(): number | null {
    if (this.initialHappiness === null || this.currentPopulation === null) {
      return null;
    }
    return this.initialHappiness + this.currentPopulation - 1;
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
      return 50 * Math.log(this.initialHappiness / finalHappiness);
    } else {
      return Number.POSITIVE_INFINITY;
    }
  }

  get timeBeforeFilledText(): string {
    const tbf = this.timeBeforeFilled;
    if (tbf === null) {
      return 'N/A';
    } else if (tbf === Number.POSITIVE_INFINITY) {
      return `Never (max population ${this.maxPopulation})`;
    } else {
      return tbf.toFixed(2);
    }
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

  test() {
  }

  constructor(protected researchInfoService: ResearchInfoService) {
    this.initialHappiness = null;
    this.currentPopulation = null;
    this.townCapacity = null;
    this.time = null;
  }
}
