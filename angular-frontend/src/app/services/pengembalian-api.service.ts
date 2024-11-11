import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersApiService } from './users-api.service';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';
import { Pengembalian } from '../models/pengembalian.model';

@Injectable({
  providedIn: 'root'
})
export class PengembalianApiService {

  constructor(private http: HttpClient, private usersApiService: UsersApiService, private localStorageService: LocalStorageService) { }

  private apiUrl = 'http://localhost:8000/api/pengembalian-mobil';

  private generateHeaders(): HttpHeaders {
    const token = this.localStorageService.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  cekPlatNomor(platNomor: string): Observable<any>
  {
    return this.http.post<Pengembalian[]>(`${this.apiUrl}/cek-plat-nomor`, { nomor_plat: platNomor } , { 
      headers: this.generateHeaders()
    });
  }

  prosesPengembalian(data: Pengembalian): Observable<any>
  {
    return this.http.put(`${this.apiUrl}/proses/${data.id}`, data, {
      headers: this.generateHeaders()
    });
  }
}
