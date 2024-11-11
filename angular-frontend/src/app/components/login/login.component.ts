import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { AlertService } from '../../services/alert.service';
import { FormsModule } from '@angular/forms';
import { AuthApiService } from '../../services/auth-api.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Login } from '../../models/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  constructor(private authApiService: AuthApiService, private localStorageService: LocalStorageService, private router: Router, private alertService: AlertService) {}
  
  showPassword = false;
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  
  formLoginData: Login = { username: '', password: '' };

  onSubmit(): void
  {
    this.authApiService.login(this.formLoginData).subscribe(
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

  goToRegistrasi(): void
  {
    this.router.navigate(['/registrasi']);
  }
}
