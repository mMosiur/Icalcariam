import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {StoreService} from "../../interfaces/store-service";

export interface LanguageModel {
  Code: string;
  LongName: string;
}

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './general.component.html',
  styleUrl: './general.component.css'
})
export class GeneralComponent {
  languages: LanguageModel[] = [
    { Code: 'en', LongName: 'English' },
    { Code: 'pl', LongName: 'Polski' },
  ];
  currentLanguageCode = this.translateService.currentLang;

  constructor(private translateService: TranslateService, private store: StoreService) {
  }

  changeLanguage(event: any) {
    const lang = event.target.value;
    if (this.currentLanguageCode === lang) return;
    this.translateService.use(lang);
    this.currentLanguageCode = lang;
    this.store.set('language', lang);
  }
}
