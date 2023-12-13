import {Injectable} from '@angular/core';
import {
  EconomyResearch,
  MilitaryResearch,
  MutableResearchState,
  ResearchCategory,
  ResearchState,
  ScienceResearch,
  SeafaringResearch
} from "../models/research";
import {StoreService} from "../interfaces/store-service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ResearchInfoService {

  private _currentState?: MutableResearchState;
  private stateSubject: BehaviorSubject<ResearchState> = new BehaviorSubject<ResearchState>(this.currentState);
  public state: Observable<ResearchState> = this.stateSubject.asObservable();

  private get rawState(): MutableResearchState {
    if (this._currentState !== undefined) {
      return this._currentState;
    }
    const storeObject = this.storeService.getObject<MutableResearchState>('ResearchState');
    if (storeObject !== null) {
      this._currentState = storeObject;
      return this._currentState;
    }
    this._currentState = new MutableResearchState();
    this.storeService.setObject('ResearchState', this._currentState);
    return this._currentState;
  }

  get currentState(): ResearchState {
    return this.rawState;
  }

  constructor(private storeService: StoreService) {
  }

  // setResearchLevel(research: ResearchCategory, value: number): void {
  //   this.state.setResearchLevel(research, value);
  //   this.storeService.setObject('ResearchState', this._state);
  // }

  setResearchLevel(research: ResearchCategory, value: number): void {
    switch (research) {
      case ResearchCategory.Seafaring:
        this.setSeafaringResearch(value as SeafaringResearch);
        break;
      case ResearchCategory.Economy:
        this.setEconomyResearch(value as EconomyResearch);
        break;
      case ResearchCategory.Science:
        this.setScienceResearch(value as ScienceResearch);
        break;
      case ResearchCategory.Military:
        this.setMilitaryResearch(value as MilitaryResearch);
        break;
      default:
        throw new Error(`Unknown research category: '${research}'`);
    }
  }

  setSeafaringResearch(value: SeafaringResearch): void {
    this.rawState.seafaring = value;
    this.stateSubject.next(this.currentState);
    this.storeService.setObject('ResearchState', this._currentState);
  }

  setEconomyResearch(value: EconomyResearch): void {
    this.rawState.economy = value;
    this.stateSubject.next(this.currentState);
    this.storeService.setObject('ResearchState', this._currentState);
  }

  setScienceResearch(value: ScienceResearch): void {
    this.rawState.science = value;
    this.stateSubject.next(this.currentState);
    this.storeService.setObject('ResearchState', this._currentState);
  }

  setMilitaryResearch(value: MilitaryResearch): void {
    this.rawState.military = value;
    this.stateSubject.next(this.currentState);
    this.storeService.setObject('ResearchState', this._currentState);
  }

  // isResearched(research: Research): boolean {
  //
  // }

  test() {
  }

  isSeafaringResearched(research: SeafaringResearch): boolean {
    return this.rawState.seafaring >= research;
  }

  isEconomyResearched(research: EconomyResearch): boolean {
    return this.rawState.economy >= research;
  }

  isScienceResearched(research: ScienceResearch): boolean {
    return this.rawState.science >= research;
  }

  isMilitaryResearched(research: MilitaryResearch): boolean {
    return this.rawState.military >= research;
  }

  getResearchLevel(research: ResearchCategory): number {
    const state = this.rawState;
    switch (research) {
      case ResearchCategory.Seafaring:
        return state.seafaring;
      case ResearchCategory.Economy:
        return state.economy;
      case ResearchCategory.Science:
        return state.science;
      case ResearchCategory.Military:
        return state.military;
      default:
        throw new Error(`Unknown research category: '${research}'`);
    }
  }

  isResearchFutureAvailable(research: ResearchCategory): boolean {
    const state = this.rawState;
    switch (research) {
      case ResearchCategory.Seafaring:
        return state.seafaring >= SeafaringResearch.OffshoreBase;
      case ResearchCategory.Economy:
        return state.economy >= EconomyResearch.Utopia;
      case ResearchCategory.Science:
        return state.science >= ScienceResearch.TheArchimedeanPrinciple;
      case ResearchCategory.Military:
        return state.military >= MilitaryResearch.CannonCasting;
      default:
        throw new Error(`Unknown research category: '${research}'`);
    }
  }

  getResearchFutureLevel(research: ResearchCategory): number {
    const state = this.rawState;
    switch (research) {
      case ResearchCategory.Seafaring:
        return state.seafaringFuture;
      case ResearchCategory.Economy:
        return state.economyFuture;
      case ResearchCategory.Science:
        return state.scienceFuture;
      case ResearchCategory.Military:
        return state.militaryFuture;
      default:
        throw new Error(`Unknown future: '${research}'`);
    }
  }
}
