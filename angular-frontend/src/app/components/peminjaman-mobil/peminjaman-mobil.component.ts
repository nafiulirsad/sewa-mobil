import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { AlertComponent } from '../alert/alert.component';
import { AlertService } from '../../services/alert.service';
import { Mobil } from '../../models/mobil.model';
import { Peminjaman } from '../../models/peminjaman.model';
import { PeminjamanApiService } from '../../services/peminjaman-api.service';
import { UsersApiService } from '../../services/users-api.service';

@Component({
  selector: 'app-peminjaman-mobil',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, AlertComponent, NavigationComponent],
  templateUrl: './peminjaman-mobil.component.html',
  styleUrl: './peminjaman-mobil.component.css'
})
export class PeminjamanMobilComponent implements OnInit {

  constructor(private peminjamanApiService: PeminjamanApiService, private usersApiService: UsersApiService, private alertService: AlertService){}

  title = "Peminjaman Mobil";

  ngOnInit(): void {
    this.getMobilTersedia();
    this.getMobilYangSayaPinjam();
  }

  peminjamanTersedia: Mobil[] = [];
  getMobilTersedia(): void
  {
    this.peminjamanApiService.getMobilTersedia().subscribe(
      (data: Mobil[]) => {
        this.peminjamanTersedia = data;
      },
      (error) => {
        this.alertService.showAlert('Gagal mendapatkan data mobil yang tersedia.', 'error');
      }
    );
  }

  mobilYangSayaPinjam: Peminjaman[] = [];
  getMobilYangSayaPinjam(): void
  {
    this.peminjamanApiService.getMobilYangSayaPinjam().subscribe(
      (data: Peminjaman[]) => {
        this.mobilYangSayaPinjam = data;
      },
      (error) => {
        this.alertService.showAlert('Gagal mendapatkan data mobil yang saya pinjam.', 'error');
      }
    );
  }

  formPeminjamanData: Peminjaman = { id: '', pengguna_id: '', mobil_id: '', mobil: null, tanggal_mulai: '', tanggal_selesai: '', jumlah_biaya: 0, status: 0 };

  isModalAddEditOpen = false;
  isEditMode = false;
  openModalTambahPeminjamanMobil(): void
  {
    this.isEditMode = false;
    this.isModalAddEditOpen = true;
    this.formPeminjamanData = { id: '', pengguna_id: '', mobil_id: '', mobil: null, tanggal_mulai: '', tanggal_selesai: '', jumlah_biaya: 0, status: 0 };
  }
  
  detailMobil = "";
  openModalEditPeminjamanMobil(peminjaman: Peminjaman): void
  {
    this.isEditMode = true;
    this.isModalAddEditOpen = true;
    this.formPeminjamanData = { ...peminjaman };
    this.detailMobil = peminjaman.mobil?.merek + ' - ' + peminjaman.mobil?.model + ' - ' + peminjaman.mobil?.nomor_plat;
  }

  onSubmit(): void
  {
    this.formPeminjamanData.pengguna_id = this.usersApiService.getMyUserData().id;
    if(this.isEditMode){
      this.peminjamanApiService.editPeminjaman(this.formPeminjamanData).subscribe(
        response => {
          this.alertService.showAlert(response.message, 'success');
          this.getMobilTersedia();
          this.getMobilYangSayaPinjam();
          this.closeModal();
        },
        error => {
          this.alertService.showAlert(error.error.message, 'error');
        }
      )
    } 
    else {
      this.peminjamanApiService.tambahPeminjaman(this.formPeminjamanData).subscribe(
        response => {
          this.alertService.showAlert(response.message, 'success');
          this.getMobilTersedia();
          this.getMobilYangSayaPinjam();
          this.closeModal();
        },
        error => {
          this.alertService.showAlert(error.error.message, 'error');
        }
      )
    }
  }

  isModalBatalOpen = false;
  detailPeminjaman = "";
  openModalBatalkanPeminjamanMobil(peminjaman: Peminjaman): void
  {
    this.isModalBatalOpen = true;
    this.formPeminjamanData = { ...peminjaman };
    this.detailMobil = peminjaman.mobil?.merek + ' - ' + peminjaman.mobil?.model + ' - ' + peminjaman.mobil?.nomor_plat;
    this.detailPeminjaman = this.formatTanggal(peminjaman.tanggal_mulai) + ' s.d. ' + this.formatTanggal(peminjaman.tanggal_selesai);
  }

  onBatalkan(): void
  {
    this.peminjamanApiService.batalkanPeminjaman(this.formPeminjamanData.id).subscribe(
      response => {
        this.alertService.showAlert(response.message, 'success');
        this.getMobilTersedia();
        this.getMobilYangSayaPinjam();
        this.closeModal();
      },
      error => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    )
  }

  closeModal(): void
  {
    this.isModalAddEditOpen = false;
    this.isModalBatalOpen = false;
  }

  formatTanggal(inputDate: string): string {
    const date = new Date(inputDate); 
    const formatter = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    return formatter.format(date);
  }
}
