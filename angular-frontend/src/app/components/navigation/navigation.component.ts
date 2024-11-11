import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthApiService } from '../../services/auth-api.service';
import { AlertService } from '../../services/alert.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Pengguna } from '../../models/pengguna.model';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {

  constructor(private authApiService: AuthApiService, private localStorageService: LocalStorageService, private router: Router, private alertService: AlertService) {}

  ngOnInit(): void {
    this.getPenggunaData();
  }

  penggunaData: Pengguna = { id: '', nama: '', alamat: '', nomor_telepon: null, nomor_sim: null };
  getPenggunaData(): void
  {
    const pengguna = JSON.parse(this.localStorageService.getItem('pengguna') || '{}');
  
    if (pengguna) {
      this.penggunaData = { ...this.penggunaData, ...pengguna };
    }
  }

  onLogout(): void
  {
    this.authApiService.logout().subscribe(
      response => {
        this.alertService.showAlert(response.message, 'success');
      },
      error => {
        this.alertService.showAlert('Berhasil logout, silakan login kembali untuk menggunakan aplikasi.', 'success');
      }
    );
    setTimeout(() => {
      this.localStorageService.removeItem('token');
      this.localStorageService.removeItem('pengguna');
      this.router.navigate(['/login']);
    }, 3000);
  }
}
