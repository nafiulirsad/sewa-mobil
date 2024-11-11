import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';
import { Peminjaman } from '../models/peminjaman.model';
import { UsersApiService } from './users-api.service';

@Injectable({
  providedIn: 'root'
})
export class PeminjamanApiService {

  constructor(private http: HttpClient, private usersApiService: UsersApiService, private localStorageService: LocalStorageService) {}
  
  private apiUrl = 'http://localhost:8000/api/peminjaman-mobil';

  private generateHeaders(): HttpHeaders {
    const token = this.localStorageService.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getMobilTersedia(): Observable<any>
  {
    return this.http.get<Peminjaman[]>(`${this.apiUrl}/tersedia`, { 
      headers: this.generateHeaders()
    });
  }

  getMobilYangSayaPinjam(): Observable<any>
  {
    const myData = this.usersApiService.getMyUserData();
    return this.http.get<Peminjaman[]>(`${this.apiUrl}/dipinjam/${myData.id}`, { 
      headers: this.generateHeaders()
    });
  }

  tambahPeminjaman(data: Peminjaman): Observable<any> 
  {
    return this.http.post(`${this.apiUrl}`, data, {
      headers: this.generateHeaders()
    });
  }

  editPeminjaman(data: Peminjaman): Observable<any> 
  {
    return this.http.put(`${this.apiUrl}/${data.id}`, data, {
      headers: this.generateHeaders()
    });
  }

  batalkanPeminjaman(id: string): Observable<any>
  {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.generateHeaders()
    });
  }
}
