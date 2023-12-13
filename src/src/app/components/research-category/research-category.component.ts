import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {
  EconomyResearch,
  MilitaryResearch,
  ResearchCategory,
  ScienceResearch,
  SeafaringResearch
} from "../../models/research";
import {ResearchInfoService} from "../../services/research-info.service";

@Component({
  selector: 'app-research-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './research-category.component.html',
  styleUrl: './research-category.component.css'
})
export class ResearchCategoryComponent implements OnInit {

  @Input({required: true}) researchCategory: ResearchCategory = ResearchCategory.Seafaring;
  @Input() canClear: boolean = false;

  categoryResearches: string[] = [];
  private _selectedResearch: number | null = null;

  constructor(private researchInfoService: ResearchInfoService) {
  }

  ngOnInit() {
    switch (this.researchCategory) {
      case ResearchCategory.Seafaring:
        this.initSeafaringResearches();
        break;
      case ResearchCategory.Economy:
        this.initEconomyResearches();
        break;
      case ResearchCategory.Science:
        this.initScienceResearches();
        break;
      case ResearchCategory.Military:
        this.initMilitaryResearches();
        break;
      default:
        throw new Error(`Research category ${this.researchCategory} not supported`);
    }
  }

  private initSeafaringResearches() {
    this.categoryResearches = Object.keys(SeafaringResearch)
      .filter((key) => !isNaN(Number(SeafaringResearch[key as keyof typeof SeafaringResearch])) && SeafaringResearch[key as keyof typeof SeafaringResearch] > 0);
    this._selectedResearch = this.researchInfoService.getResearchLevel(ResearchCategory.Seafaring);
  }

  private initEconomyResearches() {
    this.categoryResearches = Object.keys(EconomyResearch)
      .filter((key) => !isNaN(Number(EconomyResearch[key as keyof typeof EconomyResearch])) && EconomyResearch[key as keyof typeof EconomyResearch] > 0);
    this._selectedResearch = this.researchInfoService.getResearchLevel(ResearchCategory.Economy);
  }

  private initScienceResearches() {
    this.categoryResearches = Object.keys(ScienceResearch)
      .filter((key) => !isNaN(Number(ScienceResearch[key as keyof typeof ScienceResearch])) && ScienceResearch[key as keyof typeof ScienceResearch] > 0);
    this._selectedResearch = this.researchInfoService.getResearchLevel(ResearchCategory.Science);
  }

  private initMilitaryResearches() {
    this.categoryResearches = Object.keys(MilitaryResearch)
      .filter((key) => !isNaN(Number(MilitaryResearch[key as keyof typeof MilitaryResearch])) && MilitaryResearch[key as keyof typeof MilitaryResearch] > 0);
    this._selectedResearch = this.researchInfoService.getResearchLevel(ResearchCategory.Military);
  }

  get categoryName() {
    return ResearchCategory[this.researchCategory];
  }

  get selectedResearch(): number | null {
    return this._selectedResearch;
  }

  set selectedResearch(research: number | null) {
    if (this._selectedResearch === research) return;
    this._selectedResearch = research;
    this.researchInfoService.setResearchLevel(this.researchCategory, research ?? 0);
  }

  getResearchName(research: number | string): string {
    switch (this.researchCategory) {
      case ResearchCategory.Seafaring:
        return this.getSeafaringResearchName(research);
      case ResearchCategory.Economy:
        return this.getEconomyResearchName(research);
      case ResearchCategory.Science:
        return this.getScienceResearchName(research);
      case ResearchCategory.Military:
        return this.getMilitaryResearchName(research);
      default:
        throw new Error(`Research category ${this.researchCategory} not supported`);
    }
  }

  getSeafaringResearchName(research: SeafaringResearch | string): string {
    if (typeof research === 'string') {
      research = SeafaringResearch[research as keyof typeof SeafaringResearch];
    }
    return SeafaringResearch[research];
  }

  getEconomyResearchName(research: EconomyResearch | string): string {
    if (typeof research === 'string') {
      research = EconomyResearch[research as keyof typeof EconomyResearch];
    }
    return EconomyResearch[research];
  }

  getScienceResearchName(research: ScienceResearch | string): string {
    if (typeof research === 'string') {
      research = ScienceResearch[research as keyof typeof ScienceResearch];
    }
    return ScienceResearch[research];
  }

  getMilitaryResearchName(research: MilitaryResearch | string): string {
    if (typeof research === 'string') {
      research = MilitaryResearch[research as keyof typeof MilitaryResearch];
    }
    return MilitaryResearch[research];
  }
}
