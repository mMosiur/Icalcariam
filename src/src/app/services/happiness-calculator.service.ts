import {Injectable} from '@angular/core';
import {ResearchInfoService} from "./research-info.service";
import {DetailedCityInfo} from "../models/city-info";
import {EconomyResearch, ResearchCategory, ScienceResearch} from "../models/research";
import {EmpireInfoService} from "./empire-info.service";
import {GovernmentForm} from "../models/empire";

@Injectable({
  providedIn: 'root'
})
export class HappinessCalculatorService {
  static readonly WellDiggingBonus = 50;
  static readonly HolidayResearchBonus = 25;
  static readonly UtopiaResearchBonus = 200;
  static readonly EconomicFuturesPerLevelBonus = 10;

  static readonly DemocracyBonus = 75;
  static readonly DictatorshipBonus = -75;

  constructor(private researchInfo: ResearchInfoService, private empireInfo: EmpireInfoService) {
  }

  private getGovernmentFormBonus(cityInfo: DetailedCityInfo): number {
    switch (this.empireInfo.governmentForm) {
      case GovernmentForm.Democracy:
        return HappinessCalculatorService.DemocracyBonus;
      case GovernmentForm.Dictatorship:
        return HappinessCalculatorService.DictatorshipBonus;
      case GovernmentForm.Theocracy:
        // Happiness in all towns with a temple is increased by +2 times the conversion rate. The maximum bonus is +150.
        // -20 Happiness in all towns without temples
        throw new Error("Theocracy happiness not implemented");
      default:
        return 0;
    }
  }

  private getResearchBonuses(cityInfo: DetailedCityInfo): number {
    let bonus = 0;
    if (this.researchInfo.isScienceResearched(ScienceResearch.WellConstruction) && cityInfo.isCapital) {
      bonus += HappinessCalculatorService.WellDiggingBonus;
    }
    if (this.researchInfo.isEconomyResearched(EconomyResearch.RelaxationHoliday) && cityInfo.isCapital) {
      bonus += HappinessCalculatorService.HolidayResearchBonus;
    }
    if (this.researchInfo.isEconomyResearched(EconomyResearch.Utopia) && cityInfo.isCapital) {
      bonus += HappinessCalculatorService.UtopiaResearchBonus;
    }
    if (this.researchInfo.isResearchFutureAvailable(ResearchCategory.Economy)) {
      bonus += this.researchInfo.getResearchFutureLevel(ResearchCategory.Economy) * HappinessCalculatorService.EconomicFuturesPerLevelBonus;
    }
    return bonus;
  }

  calculateHappiness(cityInfo: DetailedCityInfo): number {
    let happiness = 0;
    happiness += this.getGovernmentFormBonus(cityInfo);
    happiness += this.getResearchBonuses(cityInfo);
    return happiness;
  }
}
