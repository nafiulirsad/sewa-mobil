import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from "../alert/alert.component";
import { AlertService } from '../../services/alert.service';
import { CommonModule } from '@angular/common';
import { AuthApiService } from '../../services/auth-api.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Registrasi } from '../../models/registrasi.model';

@Component({
  selector: 'app-registrasi',
  standalone: true,
  imports: [CommonModule, FormsModule, AlertComponent],
  templateUrl: './registrasi.component.html',
  styleUrl: './registrasi.component.css'
})
export class RegistrasiComponent {
  
  constructor(private authApiService: AuthApiService, private localStorageService: LocalStorageService, private router: Router, private alertService: AlertService) {}

  showPassword = false;
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  
  formRegistrasiData: Registrasi = { nama: '', alamat: '', nomor_telepon: null, nomor_sim: null, username: '', password: '', password_confirmation: '' };

  onSubmit(): void
  {
    this.authApiService.registrasi(this.formRegistrasiData).subscribe(
      response => {
        this.alertService.showAlert(response.message, 'success');
        setTimeout(() => {
          this.localStorageService.setItem('token', response.token);
          this.localStorageService.setItem('pengguna', JSON.stringify(response.pengguna));
          this.router.navigate(['/manajemen-mobil']);
        }, 3000);
      },
      error => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    )
  }

  goToLogin(): void
  {
    this.router.navigate(['/login']);
  }
}
