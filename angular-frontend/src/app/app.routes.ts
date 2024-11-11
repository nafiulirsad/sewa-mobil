import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrasiComponent } from './components/registrasi/registrasi.component';
import { ManajemenMobilComponent } from './components/manajemen-mobil/manajemen-mobil.component';
import { PeminjamanMobilComponent } from './components/peminjaman-mobil/peminjaman-mobil.component';
import { PengembalianMobilComponent } from './components/pengembalian-mobil/pengembalian-mobil.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registrasi', component: RegistrasiComponent },
    { path: 'manajemen-mobil', component: ManajemenMobilComponent, canActivate: [authGuard] },
    { path: 'peminjaman-mobil', component: PeminjamanMobilComponent, canActivate: [authGuard] },
    { path: 'pengembalian-mobil', component: PengembalianMobilComponent, canActivate: [authGuard] },
];
