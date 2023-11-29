import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResearchCategory} from "../../models/research";
import {FormsModule} from "@angular/forms";
import {ResearchCategoryComponent} from "../research-category/research-category.component";

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [CommonModule, FormsModule, ResearchCategoryComponent],
  templateUrl: './research.component.html',
  styleUrl: './research.component.css'
})
export class ResearchComponent {

  researchCategories: ResearchCategory[] = [
    ResearchCategory.Seafaring,
    ResearchCategory.Economy,
    ResearchCategory.Science,
    ResearchCategory.Military,
  ];

}
