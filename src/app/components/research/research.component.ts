import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResearchCategory} from "../../models/research";
import {FormsModule} from "@angular/forms";
import {ResearchCategoryComponent} from "./research-category/research-category.component";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [CommonModule, FormsModule, ResearchCategoryComponent, RouterOutlet, RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './research.component.html',
  styleUrl: './research.component.css'
})
export class ResearchComponent {

  selectedResearchCategory: ResearchCategory = ResearchCategory.Seafaring;

  researchCategories = [
    ResearchCategory.Seafaring,
    ResearchCategory.Economy,
    ResearchCategory.Science,
    ResearchCategory.Military,
  ];

  getTranslateKey(s: string): string {
    return 'RESEARCH.CATEGORIES.' + s.toUpperCase();
  }

  setActiveTab(researchCategory: ResearchCategory) {
    this.selectedResearchCategory = researchCategory;
  }
}
