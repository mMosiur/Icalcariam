import {Injectable} from '@angular/core';
import {GovernmentForm} from "../models/empire";
import {StoreService} from "../interfaces/store-service";

@Injectable({
  providedIn: 'root'
})
export class EmpireInfoService {

  private _playerName?: string;
  private _governmentForm: GovernmentForm = GovernmentForm.Ikacracy;

  get playerName(): string {
    if (this._playerName !== undefined) {
      return this._playerName;
    }
    const playerName = this.storeService.getString('PlayerName') ?? '';
    if (playerName !== null) {
      this._playerName = playerName;
      return this._playerName;
    }
    this._playerName = '';
    this.storeService.setString('PlayerName', '');
    return this._playerName;
  }

  get governmentForm(): GovernmentForm {
    return this._governmentForm;
  }

  set playerName(value: string) {
    if (this._playerName === value) {
      return;
    }
    this._playerName = value;
    this.storeService.setString('PlayerName', value);
  }

  set governmentForm(value: GovernmentForm) {
    if (this._governmentForm === value) {
      return;
    }
    this._governmentForm = value;
    this.storeService.setString('GovernmentForm', value);
  }

  constructor(private storeService: StoreService) {
  }
}
