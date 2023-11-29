import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  EconomyResearch,
  MilitaryResearch,
  ResearchCategory,
  ScienceResearch,
  SeafaringResearch
} from "../../models/research";
import {ResearchInfoService} from "../../services/research-info.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './research.component.html',
  styleUrl: './research.component.css'
})
export class ResearchComponent implements OnInit {

  seafaringResearches: SeafaringResearch[] = [];
  private _selectedSeafaringResearch: SeafaringResearch = SeafaringResearch.None;

  economyResearches: EconomyResearch[] = [];
  private _selectedEconomyResearch: EconomyResearch = EconomyResearch.None;

  scienceResearches: ScienceResearch[] = [];
  private _selectedScienceResearch: ScienceResearch = ScienceResearch.None;

  militaryResearches: MilitaryResearch[] = [];
  private _selectedMilitaryResearch: MilitaryResearch = MilitaryResearch.None;

  constructor(private researchInfoService: ResearchInfoService) {
  }

  ngOnInit() {
    this.seafaringResearches = Object.keys(SeafaringResearch)
      .filter((key) => !isNaN(Number(SeafaringResearch[key as keyof typeof SeafaringResearch])) && SeafaringResearch[key as keyof typeof SeafaringResearch] > 0)
      .map((key) => SeafaringResearch[key as keyof typeof SeafaringResearch]);
    this._selectedSeafaringResearch = this.researchInfoService.getResearchLevel(ResearchCategory.Seafaring);

    this.economyResearches = Object.keys(EconomyResearch)
      .filter((key) => !isNaN(Number(EconomyResearch[key as keyof typeof EconomyResearch])) && EconomyResearch[key as keyof typeof EconomyResearch] > 0)
      .map((key) => EconomyResearch[key as keyof typeof EconomyResearch]);
    this._selectedEconomyResearch = this.researchInfoService.getResearchLevel(ResearchCategory.Economy);

    this.scienceResearches = Object.keys(ScienceResearch)
      .filter((key) => !isNaN(Number(ScienceResearch[key as keyof typeof ScienceResearch])) && ScienceResearch[key as keyof typeof ScienceResearch] > 0)
      .map((key) => ScienceResearch[key as keyof typeof ScienceResearch]);
    this._selectedScienceResearch = this.researchInfoService.getResearchLevel(ResearchCategory.Science);

    this.militaryResearches = Object.keys(MilitaryResearch)
      .filter((key) => !isNaN(Number(MilitaryResearch[key as keyof typeof MilitaryResearch])) && MilitaryResearch[key as keyof typeof MilitaryResearch] > 0)
      .map((key) => MilitaryResearch[key as keyof typeof MilitaryResearch]);
    this._selectedMilitaryResearch = this.researchInfoService.getResearchLevel(ResearchCategory.Military);
  }

  get selectedSeafaringResearch(): SeafaringResearch | null {
    return this._selectedSeafaringResearch;
  }

  set selectedSeafaringResearch(seafaringResearch: SeafaringResearch | null) {
    seafaringResearch ??= SeafaringResearch.None;
    if (this._selectedSeafaringResearch === seafaringResearch) return;
    this._selectedSeafaringResearch = seafaringResearch;
    this.researchInfoService.setSeafaringResearch(seafaringResearch);
  }

  getSeafaringResearchName(research: SeafaringResearch): string {
    return SeafaringResearch[research];
  }

  get selectedEconomyResearch(): EconomyResearch | null {
    return this._selectedEconomyResearch;
  }

  set selectedEconomyResearch(economyResearch: EconomyResearch | null) {
    economyResearch ??= EconomyResearch.None;
    if (this._selectedEconomyResearch === economyResearch) return;
    this._selectedEconomyResearch = economyResearch;
    this.researchInfoService.setEconomyResearch(economyResearch);
  }

  getEconomyResearchName(research: EconomyResearch): string {
    return EconomyResearch[research];
  }

  get selectedScienceResearch(): ScienceResearch | null {
    return this._selectedScienceResearch;
  }

  set selectedScienceResearch(scienceResearch: ScienceResearch | null) {
    scienceResearch ??= ScienceResearch.None;
    if (this._selectedScienceResearch === scienceResearch) return;
    this._selectedScienceResearch = scienceResearch;
    this.researchInfoService.setScienceResearch(scienceResearch);
  }

  getScienceResearchName(research: ScienceResearch): string {
    return ScienceResearch[research];
  }

  get selectedMilitaryResearch(): MilitaryResearch | null {
    return this._selectedMilitaryResearch;
  }

  set selectedMilitaryResearch(militaryResearch: MilitaryResearch | null) {
    militaryResearch ??= MilitaryResearch.None;
    if (this._selectedMilitaryResearch === militaryResearch) return;
    this._selectedMilitaryResearch = militaryResearch;
    this.researchInfoService.setMilitaryResearch(militaryResearch);
  }

  getMilitaryResearchName(research: MilitaryResearch): string {
    return MilitaryResearch[research];
  }
}
