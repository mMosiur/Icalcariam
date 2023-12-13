import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TranslationLoaderService {

  constructor(private translate: TranslateService) {
  }

  async loadTranslations(): Promise<any> {
    this.translate.setDefaultLang('en');
    return lastValueFrom(this.translate.use('en'));
  }
}
