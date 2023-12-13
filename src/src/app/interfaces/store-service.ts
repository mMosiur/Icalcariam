export abstract class StoreService {

  abstract get(key: string): string | null;

  abstract getString(key: string): string | null;

  abstract getNumber(key: string): number | null;

  abstract getBoolean(key: string): boolean | null;

  abstract getObject<T>(key: string): T | null;


  abstract set(key: string, value: string): void;

  abstract setString(key: string, value: string): void;

  abstract setNumber(key: string, value: number): void;

  abstract setBoolean(key: string, value: boolean): void;

  abstract setObject<T>(key: string, value: T): void;
}
