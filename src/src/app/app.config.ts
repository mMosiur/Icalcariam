import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {LocalStorageStoreService} from "./services/local-storage-store.service";
import {StoreService} from "./interfaces/store-service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {provide: StoreService, useExisting: LocalStorageStoreService}
  ],
};
