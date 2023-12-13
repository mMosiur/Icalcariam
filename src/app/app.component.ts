import {APP_INITIALIZER, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {HappinessComponent} from "./components/happiness/happiness.component";
import {ResearchComponent} from "./components/research/research.component";
import {TranslationModule} from "./translation/translation.module";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {StoreService} from "./interfaces/store-service";
import {TranslationLoaderService} from "./translation/translation-loader.service";
import {HttpLoaderFactory} from "./app.config";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (translationLoaderService: TranslationLoaderService) => () => translationLoaderService.loadTranslations(),
      deps: [TranslationLoaderService],
      multi: true
    }
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    HappinessComponent,
    ResearchComponent,
    RouterLink,
    RouterLinkActive,
    TranslationModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'icalcariam';

  constructor(private translate: TranslateService, private store: StoreService, private cdr: ChangeDetectorRef) {
    this.translate.setDefaultLang('en'); // Set a default language
    const lang = this.store.getString('language') ?? 'en';
    this.translate.use(lang);
    this.translate.getTranslation(lang).subscribe(() => {
      console.log(`Translations loaded (language: ${lang})`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.cdr.detectChanges();
    });
  }
}
