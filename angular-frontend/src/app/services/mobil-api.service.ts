import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Mobil } from '../models/mobil.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobilApiService {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}
  
  private apiUrl = 'http://localhost:8000/api/manajemen-mobil';

  private generateHeaders(): HttpHeaders {
    const token = this.localStorageService.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllMobil(): Observable<any>
  {
    return this.http.get<Mobil[]>(`${this.apiUrl}`, { 
      headers: this.generateHeaders()
    });
  }

  tambahMobil(data: Mobil): Observable<any> 
  {
    return this.http.post(`${this.apiUrl}`, data, {
      headers: this.generateHeaders()
    });
  }

  editMobil(data: Mobil): Observable<any> 
  {
    return this.http.put(`${this.apiUrl}/${data.id}`, data, {
      headers: this.generateHeaders()
    });
  }

  hapusMobil(id: string): Observable<any>
  {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.generateHeaders()
    });
  }
}
