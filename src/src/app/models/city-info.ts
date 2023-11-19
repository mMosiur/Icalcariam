export interface CityInfo {
  happiness: number;
  population: number;
  townCapacity: number;
  corruption: number;
}

export class DetailedCityInfo implements CityInfo {
  isCapital: boolean;
  tavernLevel: number;
  wineServingBonus: number;
  museumLevel: number;
  culturalGoods: number;
  population: number;
  townCapacity: number;
  corruption: number;

  get happiness(): number {
    const basicBonus = 196;
    const capitalBonus = this.isCapital ? 50 : 0;
    const wineBonus = this.tavernLevel * 12 + this.wineServingBonus;
    const culturalBonus = this.museumLevel * 20 + this.culturalGoods * 50;
    const bonuses = basicBonus + capitalBonus + wineBonus + culturalBonus;
    return (1 - this.corruption) * bonuses - this.population;
  }

  constructor(
    isCapital: boolean,
    tavernLevel: number,
    wineServingBonus: number,
    museumLevel: number,
    culturalGoods: number,
    population: number,
    townCapacity: number,
    corruption: number = 0,
  ) {
    this.isCapital = isCapital;
    this.tavernLevel = tavernLevel;
    this.wineServingBonus = wineServingBonus;
    this.museumLevel = museumLevel;
    this.culturalGoods = culturalGoods;
    this.population = population;
    this.townCapacity = townCapacity;
    this.corruption = corruption;
  }
}
