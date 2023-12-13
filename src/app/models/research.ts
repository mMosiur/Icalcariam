import {EnumValue} from "@angular/compiler-cli/src/ngtsc/partial_evaluator";

export interface ResearchState {
  get seafaring(): SeafaringResearch;
  get seafaringFuture(): number;
  get economy(): EconomyResearch;
  get economyFuture(): number;
  get science(): ScienceResearch;
  get scienceFuture(): number;
}

export class MutableResearchState implements ResearchState {

  seafaring: SeafaringResearch = SeafaringResearch.None;
  seafaringFuture: number = 0;

  economy: EconomyResearch = EconomyResearch.None;
  economyFuture: number = 0;

  science: ScienceResearch = ScienceResearch.None;
  scienceFuture: number = 0;

  military: MilitaryResearch = MilitaryResearch.None;
  militaryFuture: number = 0;
}

export enum ResearchCategory {
  Seafaring = 'Seafaring',
  Economy = 'Economy',
  Science = 'Science',
  Military = 'Military',
}

export enum SeafaringResearch {
  None = 0,

  Carpentry = 1,
  DeckWeapons = 2,
  Piracy = 3,
  ShipMaintenance = 4,
  Draught = 5,
  Expansion = 6,
  ForeignCultures = 7,
  Pitch = 8,
  Market = 9,
  GreekFire = 10,
  Counterweight = 11,
  Diplomacy = 12,
  SeaMaps = 13,
  PaddleWheelEngine = 14,
  Caulking = 15,
  MortarAttachment = 16,
  MassiveRam = 17,
  OffshoreBase = 18,
}

export enum EconomyResearch {
  None = 0,

  Conservation = 1,
  Pulley = 2,
  Wealth = 3,
  WineCulture = 4,
  ImprovedResourceGathering = 5,
  Geometry = 6,
  Architecture = 7,
  RelaxationHoliday = 8,
  Legislation = 9,
  CulinarySpecialities = 10,
  HelpingHands = 11,
  SpiritLevel = 12,
  WinePress = 13,
  Depot = 14,
  SoldierExchange = 15,
  Bureaucracy = 16,
  Utopia = 17,
}

export enum ScienceResearch {
  None = 0,

  WellConstruction = 1,
  Paper = 2,
  Espionage = 3,
  Polytheism = 4,
  Ink = 5,
  GovernmentFormation = 6,
  Invention = 7,
  CulturalExchange = 8,
  Anatomy = 9,
  Optics = 10,
  Experiments = 11,
  MechanicalPen = 12,
  BirdsFlight = 13,
  Archiving = 14,
  LetterChute = 15,
  StateReligion = 16,
  PressureChamber = 17,
  TheArchimedeanPrinciple = 18,
}

export enum MilitaryResearch {
  None = 0,

  DryDock = 1,
  Maps = 2,
  ProfessionalArmy = 3,
  Siege = 4,
  CodeOfHonour = 5,
  Ballistics = 6,
  LawOfTheLever = 7,
  Governor = 8,
  Pyrotechnics = 9,
  Logistics = 10,
  Gunpowder = 11,
  Robotics = 12,
  CannonCasting = 13,
}
