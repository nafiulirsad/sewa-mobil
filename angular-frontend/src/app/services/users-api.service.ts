import { Injectable } from '@angular/core';
import { Pengguna } from '../models/pengguna.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor(private localStorageService: LocalStorageService) { }

  public getMyUserData(): Pengguna {
    const myData = JSON.parse(this.localStorageService.getItem('pengguna') || '{}');
    return myData;
  }
}
