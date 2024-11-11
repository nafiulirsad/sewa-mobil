import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Registrasi } from '../models/registrasi.model';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  private apiUrl = 'http://localhost:8000/api/auth';

  private generateHeaders(): HttpHeaders {
    const token = this.localStorageService.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  registrasi(data: Registrasi): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrasi`, data);
  }

  login(data: Login): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, {}, {
      headers: this.generateHeaders()
    });
  }

  isAuthenticated(): boolean {
    const token = this.localStorageService.getItem('token');
    return token != null;
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/refresh-token`, { refresh_token: refreshToken });
  }
  
  verifyToken(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/verify-token`, { 
      headers: this.generateHeaders()
    });
  }
}
