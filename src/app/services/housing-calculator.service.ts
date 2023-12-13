import {Injectable} from '@angular/core';
import {DetailedCityInfo} from "../models/city-info";
import {ResearchInfoService} from "./research-info.service";
import {EconomyResearch, ResearchCategory, ScienceResearch} from "../models/research";

@Injectable({
  providedIn: 'root'
})
export class HousingCalculatorService {
  static readonly WellDiggingBonus = 50;
  static readonly HolidayResearchBonus = 50;
  static readonly UtopiaResearchBonus = 200;
  static readonly EconomicFuturesPerLevelBonus = 20;

  private getTownLevelHousingSpace(townHallLevel: number): number {
    return Math.floor(10 * Math.pow(townHallLevel, 1.5)) * 2 + 40;
  }

  private getResearchHousingSpaceBonus(cityInfo: DetailedCityInfo): number {
    let bonus = 0;
    if (this.researchInfo.isScienceResearched(ScienceResearch.WellConstruction) && cityInfo.isCapital) {
      bonus += HousingCalculatorService.WellDiggingBonus;
    }
    if (this.researchInfo.isEconomyResearched(EconomyResearch.RelaxationHoliday) && cityInfo.isCapital) {
      bonus += HousingCalculatorService.HolidayResearchBonus;
    }
    if (this.researchInfo.isEconomyResearched(EconomyResearch.Utopia) && cityInfo.isCapital) {
      bonus += HousingCalculatorService.UtopiaResearchBonus;
    }
    if (this.researchInfo.isResearchFutureAvailable(ResearchCategory.Economy)) {
      bonus += this.researchInfo.getResearchFutureLevel(ResearchCategory.Economy) * HousingCalculatorService.EconomicFuturesPerLevelBonus;
    }
    return bonus;
  }

  // https://ikariam.fandom.com/wiki/Citizen
  calculateHousingSpace(cityInfo: DetailedCityInfo): number {
    let housingSpace = this.getTownLevelHousingSpace(cityInfo.townHallLevel);
    housingSpace += this.getResearchHousingSpaceBonus(cityInfo);
    return housingSpace;
  }

  constructor(private researchInfo: ResearchInfoService) {
  }
}
