import {Injectable} from '@angular/core';
import {StoreService} from "../interfaces/store-service";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageStoreService implements StoreService {
  constructor() {
  }

  get(key: string): string | null {
    return localStorage.getItem(key);
  }

  getString(key: string): string | null {
    return this.get(key);
  }

  getNumber(key: string): number | null {
    const value = this.get(key);
    if (value === null) {
      return null;
    } else {
      return parseFloat(value);
    }
  }

  getBoolean(key: string): boolean | null {
    const value = this.get(key);
    if (value === null) {
      return null;
    } else {
      switch (value) {
        case 'true':
          return true;
        case 'false':
          return false;
        default:
          console.error(`Invalid boolean value: '${value}'`);
          return null;
      }
    }
  }

  getObject<T>(key: string): T | null {
    const value = this.get(key);
    if (value === null) {
      return null;
    } else {
      return JSON.parse(value);
    }
  }

  set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  setString(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  setNumber(key: string, value: number): void {
    localStorage.setItem(key, value.toString(10));
  }

  setBoolean(key: string, value: boolean): void {
    localStorage.setItem(key, value ? 'true' : 'false');
  }

  setObject<T>(key: string, value: T) {
    const stringValue = JSON.stringify(value);
    this.set(key, stringValue);
  }
}
